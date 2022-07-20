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

module.exports = router.put('/:uname', async (req, res) => {
    const username = req.params.uname
    const deletePost = `SELECT * FROM posts WHERE fk_username='${username}'`
    const deleteResponse = await pool.query(deletePost, (error, result) => {
        if (error) {
            console.log(error)
        }
        else {
            res.json(result)
        }
    });
    return;
})

module.exports = router.delete('/:uname/:postid', async (req,res) => {
    console.log("running");
    const postid = req.params.postid;
    // const deletePost = `DELETE * FROM posts WHERE postid='${postid}'`
    // const deleteResponse = await pool.query(deletePost, (error, result) => {
    //     if (error) {
    //         console.log(error)
    //     }
    //     else {
    //         res.json(result)
    //     }
    // });
    console.log("deleted");
    return;
})