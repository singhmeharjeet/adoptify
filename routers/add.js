const express = require("express"),
	router = express.Router();

const pool = require("../database");
const AWS = require('aws-sdk')
const fs = require('fs')

const s3 = new AWS.S3({
	region: 'us-west-2',
	accessKeyId: 'AKIAQPWQC7WAFUD3JVNS',
	secretAccessKey: '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',
});

//add post
module.exports = router.post("/", async (req, res) => {
	if (req.files === null) {
		return res.status(400).json({ msg: "no file uploaded" });
	}

	const { username, petName, petSpecies, petColor, petDescription } = req.body;
	const petImage = req.files.petImage;
	petImage.mv(`${__dirname}/../uploadedImages/${petImage.name}`, async (err) => {
		if (err) { 
			console.error(err);
            return res
			.status(500)
			.json({ msg: "can't save file in the server" });
        }
 
		var imgpath = `${__dirname}/../uploadedImages/${petImage.name}`;
		const fileContent = fs.readFileSync(imgpath);

		//TO GIVE IMAGE A UNIQUE ID
		//insert post with pet name, pet species, color, description, username, INSERT query
		const newPostQ = `INSERT INTO posts(pet_name, pet_species, pet_color, images, description, fk_username) VALUES 
		('${petName}', '${petSpecies}', '${petColor}', NULL, '${petDescription}', '${username}')`;
		await pool.query(newPostQ);
		//find that post we just inserted, extract post id, SELECT query
		const findPostQ = `SELECT * FROM posts WHERE pet_name='${petName}' AND pet_species='${petSpecies}'`;
		const findResult = await pool.query(findPostQ);
		var postID = findResult.rows[0].postid;
		// name it with that post id,

		const params = { 
			Bucket: "adoptify-posts",
			Key: `${username}-${postID}.jpg`,
			Body: fileContent, 
		};
		s3.upload(params, async function (err, data) { 
			if (err) console.log(err);
			var petImageURL = data.Location;
			//update query and add the petimage url, UPDATE query
			const addImageQ = `UPDATE posts SET images[0]='${petImageURL}' WHERE postid=${postID}`;
			await pool.query(addImageQ);
			console.log("File uploaded succesfully,", petImageURL) 
			return res.status(200).json({
				msg: "file uploaded successfully",
				image: petImage,
				imageName: `${petImage.name}`,
				imagePath: `${__dirname}/uploadedImages/${petImage.name}`,
			}); 
		});

    });

});

