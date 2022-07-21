const express = require("express"),
	router = express.Router();
const pool = require("../database.js");

module.exports = router.post("/:id", async(req, res) => {
    const pid = req.params.id;
    const deleteQuery = `DELETE FROM posts WHERE postid=${pid}`
    await pool.query(deleteQuery, (error, result) => {
        if (error) {
            console.log("error", error);
        } else {
            console.log("winning");
        }
    })
})