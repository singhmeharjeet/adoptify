const express = require("express"),
	router = express.Router();
const pool = require("../database.js");
const { v4: uuidv4 } = require('uuid');

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
	region: "us-west-2",
	accessKeyId: "AKIAQPWQC7WAFUD3JVNS",
	secretAccessKey: "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",
});

module.exports = router.post("/", async (req, res) => {
	const { username, id, name, species, des } = req.body;
	const newPic = req.files.imageFile.data;
	const uID = uuidv4();

	const params = {
		Bucket: "adoptify-posts",
		Key: `${username}-${id}-${uID}.jpg`,
		Body: newPic,
	};

	s3.upload(params, function (err, data) {
		if (err) console.log(err);
		var newPicURL = data.Location;
		const editPostQuery = `update posts set(pet_name, pet_species, description, images[0])  = ('${name}', '${species}', '${des}', '${newPicURL}') where postid=${id} returning *`;

		pool.query(editPostQuery, (error, result) => {
			if (error) {
				res.json({ status: false, message: "error" }).status(400);
			} else {
				res.json({
					status: true,
					message: "edited",
					data: result.rows[0],
				}).status(200);
			}
		});
	});
});
