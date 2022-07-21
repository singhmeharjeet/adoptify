const express = require("express");
const router = express.Router();
const pool = require("../database");

module.exports = router.get("/", async (req, res) => {
	//var allusersquery = 'SELECT * FROM users INNER JOIN posts ON users.userid = posts.fk_userid';
	var allusersquery = "SELECT * FROM users";
	var allpostsquery = "SELECT * FROM posts";

	try {
		const usersresult = await pool.query(allusersquery);
		const postsresult = await pool.query(allpostsquery);
		const allUsersResults = usersresult.rows;
		const allPostsResults = postsresult.rows;

		// add user ids into a set
		const userset = new Set();
		for (let row of usersresult.rows) {
			userset.add(row.username);
		}

		// gather all the posts of that user
		const resultData = [];
		const allusers = [...userset];

		for (let username of allusers) {
			const usersFilteredResults = allUsersResults.filter(
				(user) => user.username === username
			);
			const postsFilteredResults = allPostsResults.filter(
				(post) => post.fk_username === username
			);

			const eachuser = {
				username: usersFilteredResults[0].username,
				password: usersFilteredResults[0].password,
				firstName: usersFilteredResults[0].firstname,
				lastName: usersFilteredResults[0].lastname,
				profilepicture: usersFilteredResults[0].profilepicture,
				phone: usersFilteredResults[0].phone,
				email: usersFilteredResults[0].email,
				address: usersFilteredResults[0].address,
				isadmin: usersFilteredResults[0].isadmin,
				posts: postsFilteredResults,
			};

			resultData.push(eachuser);
		}
		console.log(resultData);
		const data = { results: resultData };
		res.json(data);
	} catch (error) {
		res.end(error);
	}
});
