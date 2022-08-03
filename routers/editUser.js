const express = require("express"),
	router = express.Router();
const pool = require("../database.js");

module.exports = router.post("/", async (req, res) => {
	const { username, password, firstname, lastname, address, phone } =
		req.body;

	// console.log(
	// 	"username, password, firstname, lastname, address, phone",
	// 	username,
	// 	password,
	// 	firstname,
	// 	lastname,
	// 	address,
	// 	phone
	// );
	const editUserQuery = `update users set (password, firstname, lastname, address, phone) = ('${password}', '${firstname}', '${lastname}','${address}','${phone}') where username='${username}' returning *`;

	pool.query(editUserQuery, (error, result) => {
		if (error) {
			console.log('error', error);
			res.json({ status: false, message: "error" }).status(400);
		} else {
			console.log("result", result);
			res.json({
				status: true,
				message: "edited",
				data: result.rows[0],
			}).status(200);
		}
	});
});
