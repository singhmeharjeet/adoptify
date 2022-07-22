const express = require("express"),
	router = express.Router();
const pool = require("../database.js");

module.exports = router.post("/", async (req, res) => {
	const { id, name, species, des } = req.body;
	console.log('id is', id);
	const editPostQuery = `update posts set (pet_name, pet_species, description) = ('${name}', '${species}', '${des}') where postid=${id}`;
	pool.query(editPostQuery, (error, result) => {
		if (error) {
			console.log("error", error);
		} else {
			console.log("Edited the Post");
		}
	});
});
