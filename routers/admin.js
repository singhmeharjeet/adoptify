const express = require("express"),
	router = express.Router();
const pool = require("../database.js");

//show the admin page with all the users
module.exports = router.get("/", async (req, res) => {
	var allUsers = [];
	var allPosts = [];
	const allUsersQuery = `SELECT * FROM users`;
	const allPostsQuery = `SELECT * FROM posts`;

	pool.query(allUsersQuery, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			allUsers = result.rows;
			// sending another Query---------
			// This nesting of query is done to handel async await
			pool.query(allPostsQuery, (error, result) => {
				if (error) {
					console.log("error", error);
				} else {
					allPosts = result.rows;
					res.json({
						allUsers: allUsers,
						allPosts: allPosts,
					});
				}
			});
		}
	});
});
