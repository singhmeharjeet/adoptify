const express = require("express"),
	router = express.Router();
const pool = require('../database.js')

// app.use(express.json());
// app.use(express.urlencoded({extended:false}));

//show the profile page
module.exports = router.get('/:uname', async (req, res) => {
    const username = req.params.uname
    console.log("username:", username)
    const profileQuery = `SELECT * FROM users WHERE username='${username}'`;
    // const profileQuery = `SELECT * FROM users`
    const profileResponse = await pool.query(profileQuery, (error, result) => {
        if (error) {
            console.log(error)
        }
        else {
            // console.log(result.rows)

            res.json(result)
        } 
    });
    return;
    // if (profileResponse.rows.length === 0) {

    // }
    // console.log(profileResponse)
    // res.json(profileResponse)

})