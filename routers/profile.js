const express = require("express"),
	router = express.Router();
const pool = require("../database.js");

module.exports = router.get("/:uname", async (req, res) => {
	const username = req.params.uname;

	var userDetails = {};
	var postsDetails = [];
	const userDetailsQuery = `SELECT * FROM users WHERE username='${username}'`;
	const postsDetailsQuery = `SELECT * FROM posts WHERE fk_username='${username}'`;

	await pool.query(userDetailsQuery, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			userDetails = result.rows[0];

			// sending another Query---------
			// This nesting of query is done to handel async await
			pool.query(postsDetailsQuery, (error, result) => {
				if (error) {
					console.log("error", error);
				} else {
					postsDetails = result.rows;
					res.json({
						userDetails: userDetails,
						postsDetails: postsDetails,
					});
				}
			});
		}
	});
});

// module.exports = router.post("/:pid", async (req, res) => {
// 	const pid = req.params.pid;
// 	const updatePostQuery = `UPDATE posts`
// })