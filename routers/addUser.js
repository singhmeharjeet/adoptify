const express = require("express"),
	router = express.Router();

const pool = require("../database");

module.exports = router.post("/", async (req, res) => {
	const { uFirstName, uLastName, uPhoneNum, uAddress, uEmail, uPassword } =
		req.body;

	const newUserQ = `INSERT INTO users(username, password, firstname, lastname, profilePicture, phone, email, address, isadmin) VALUES 
    ('${uEmail}', '${uPassword}', '${uFirstName}', '${uLastName}', NULL, '${uPhoneNum}', '${uEmail}', '${uAddress}', false);`;

	await pool.query(newUserQ);
	console.log("New user added successfully!");
	res.redirect("/");
});
