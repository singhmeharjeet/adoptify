const express = require("express"),
	router = express.Router();

const pool = require("../database");

// module.exports = router.post("/addPost", async (req, res) => {
	
// });
module.exports = router.post("/addPost", async (req, res) => {
	const username = req.body.username;
	const petName = req.body.title;
	const species = req.body.species;
	const colour = req.body.color;
	const description = req.body.description;

	var petImageFName = req.body.image;
	const fileContent = fs.readFileSync(petImageFName);
	const params = {
		Bucket: "adoptifybucket",
		Key: "petImage.jpg",
		Body: fileContent,
	};
	s3.upload(params, async function (err, data) {
		if (err) throw err;
		var petImageURL = data.Location;
		const newPostQ = `INSERT INTO posts(pet_name, pet_species, pet_color, images, description, fk_username) VALUES
    ('${petName}', '${species}', '${colour}', ARRAY ['${petImageURL}'], '${description}', '${username}');`;
		await pool.query(newPostQ);
	});
	res.send("New post added succesfully!");
});
