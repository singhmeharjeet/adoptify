const express = require("express"),
	router = express.Router();
const pool = require("../database.js");

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
	region: "us-west-2",
	accessKeyId: "AKIAQPWQC7WAFUD3JVNS",
	secretAccessKey: "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",
});

//take in the new profile image file and update the database 
module.exports = router.post("/", async (req, res) => {

	const {username} = req.body;
    const newPic = req.files.newProfilePic.data;

	// console.log(username, newPic);
	const params = {
		Bucket: "adoptify-users",
		Key: `${username}.jpg`,
		Body: newPic
	};
	s3.upload(params, async function (err, data) {
		if (err) console.log(err);
		var newPicURL = data.Location;

		const updatePicQ = `UPDATE users SET profilepicture='${newPicURL}' WHERE username='${username}'`;
		await pool.query(updatePicQ);
		console.log("New profile picture uploaded and updated successfully, ", newPicURL);
	}

	)
});