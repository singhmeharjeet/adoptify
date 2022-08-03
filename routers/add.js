const express = require("express"),
	router = express.Router();

const pool = require("../database");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const s3 = new AWS.S3({
	region: "us-west-2",
	accessKeyId: "AKIAQPWQC7WAFUD3JVNS",
	secretAccessKey: "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",
});

//add post
module.exports = router.post("/", async (req, res) => {
	if (req.files === null) {
		return res.status(400).json({ msg: "no file uploaded" });
	}

	const { username, petName, petSpecies, petColor, petDescription } =
		req.body;
	const petImage = req.files.petImage.data;
	const uID = uuidv4();

	const params = {
		Bucket: "adoptify-posts",
		Key: `${username}-${uID}.jpg`,
		Body: petImage,
	};

	s3.upload(params, async function (err, data) {
		if (err) console.log(err);
		var petImageURL = data.Location;

		//update query and add the petimage url, UPDATE query
		const newPostQ = 
		`INSERT INTO posts(pet_name, pet_species, pet_color, images[0], description, fk_username) VALUES ('${petName}', '${petSpecies}', '${petColor}', '${petImageURL}', '${petDescription}', '${username}') RETURNING *`;

		pool.query(newPostQ, (error, result) => {
			if (error) {
				res.json({ status: false, message: "error" }).status(400);
			} else {
				res.json({
					status: true,
					message: "Added the post to the database.",
					data: result.rows[0],
				}).status(200);
			}
		});
		console.log("File uploaded succesfully,", petImageURL);
	});
});
