const express = require("express"),
	router = express.Router();
const pool = require("../database.js");

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
	region: "us-west-2",
	accessKeyId: "AKIAQPWQC7WAFUD3JVNS",
	secretAccessKey: "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",
});

//take in the new post image file and update the database
module.exports = router.post("/", async (req, res) => {
	const { username, postid } = req.body;
	const newPostPic = req.files.newPostPic.data;

	const params = {
		Bucket: "adoptify-posts",
		Key: `${username}-${postid}.jpg`,
		Body: newPostPic,
	};
	s3.upload(params, async function (err, data) {
		if (err) console.log(err);
		var newPostPicURL = data.Location;

		const updatePostPicQ = `UPDATE posts SET images[0]='${newPostPicURL}' WHERE postid='${postid}' returning *`;
		pool.query(updatePostPicQ, (error, result) => {
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
		console.log(
			"New post image uploaded and updated successfully, ",
			newPostPicURL
		);
	});
});