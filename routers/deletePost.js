const express = require("express"),
	router = express.Router();
const pool = require("../database.js");

module.exports = router.post("/:id", async (req, res) => {
	const pid = req.params.id;
	const deleteQuery = `DELETE FROM posts WHERE postid=${pid}`;
	pool.query(deleteQuery, (error, result) => {
		if (error) {
			res.json({ status: false, message: "error" }).status(400);
		} else {
			res.json({ status: true, message: "deleted"}).status(200);
		}
	});
});
