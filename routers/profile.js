const express = require("express"),
	router = express.Router();
const pool = require('../database.js')


//show the profile page
module.exports = router.get('/:uname', async (req, res) => {
    const username = req.params.uname
    const profileQuery = `SELECT * FROM users WHERE username='${username}'`;
    const profileResponse = await pool.query(profileQuery, (error, result) => {
        if (error) {
            console.log(error)
        }
        else {
            res.json(result)
        } 
    });
    return;
})