const express = require("express"),
	router = express.Router();
const pool = require('../database.js')


//show the admin page with all the users
module.exports = router.get('/', async (req, res) => {
    const allUsersQuery = `SELECT * FROM users`;
    const allUserResponse = await pool.query(allUsersQuery, (error, result) => {
        if (error) {
            console.log(error)
        }
        else {
            res.json(result)
        } 
    });
    return;
})