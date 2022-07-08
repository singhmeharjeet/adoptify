const express = require('express')
const router = express.Router()
const pool = require('../database')

router.post("/login", async (req, res) => {
	const requestedUsername = req.body.username;
	const requestedPassword = req.body.password;
	const userQuery = `select password from users where username = '${requestedUsername}'`;

	const userRes = await pool.query(userQuery)
	if(userRes.rows.length === 0) {
		res.json({
			token: ""
		});
		return		
	}

	const actualPassword = userRes.rows[0].password
	if (requestedPassword === actualPassword) {	
		res.json({
			token: requestedUsername,
		});
	} else {
		res.json({
			token: ""
		});
	}
});


module.exports = router