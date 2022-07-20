const express = require("express"),
	router = express.Router();
const pool = require('../database.js')

// app.use(express.json());
// app.use(express.urlencoded({extended:false}));


module.exports = router.get("/", async (req, res) => {
	try {
	  const allPets = await pool.query("SELECT * FROM posts");
	  console.log(allPets);
	  res.json(allPets.rows);
	} catch (err) {
	  console.error(err.message);
	}

    return;
  });

