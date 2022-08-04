const express = require("express"),
	router = express.Router();
const pool = require("../database.js");

module.exports = router.post("/:username", async (req, res) => {
	const username = req.params.username;
	// console.log("The username in backend is: ", username);
	const deleteAllPostsQuery = `DELETE FROM posts WHERE fk_username='${username}'`;
	const deleteUserQuery = `DELETE FROM users WHERE username='${username}'`;
	pool.query(deleteAllPostsQuery, (error, result) => {
		if (error) {
			console.log("error", error);
		} else {
			// console.log(`All Posts from account with username=(${username} deleted successfully)`);
			pool.query(deleteUserQuery, (error, result) => {
				if (error) console.log("error", error);
				else {
					// console.log(`${username} deleted successfully`);
				}
			});
		}
	});
});
