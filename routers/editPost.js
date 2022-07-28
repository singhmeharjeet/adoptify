const express = require("express"),
	router = express.Router();
const pool = require("../database.js");

module.exports = router.post("/", async (req, res) => {
	const { id, name, species, des } = req.body;
	const editPostQuery = `update posts set (pet_name, pet_species, description) = ('${name}', '${species}', '${des}') where postid=${id} returning *`;
	pool.query(editPostQuery, (error, result) => {
		if (error) {
			res.json({ status: false, message: "error" }).status(400);
		} else {
			console.log("result", result);
			res.json({ status: true, message: "edited", data: result.rows[0] }).status(
				200
			);
		}
	});
});
