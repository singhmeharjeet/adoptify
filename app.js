/* 
	Required Imports
*/
const cors = require("cors");
const express = require("express");
const upload = require("express-fileupload");
const path = require("path");
const authorize = require("./routers/login.js");
const addPost = require("./routers/add.js");
const profile = require("./routers/profile.js");
const addUser = require("./routers/addUser.js");

/* 
	Setup Server app
*/
const app = express();
const PORT = process.env.PORT || 5010;

/* 
	Middleware
*/
app.use(cors()); // Handles cross orign request errors.
app.use(upload()); // Handles image upload
app.use(express.json()); //	Converts the request body into json object from string
app.use(express.urlencoded({ extended: true })); // Understand fetch requests
app.use(express.static("public/build")); //
app.use(express.static("public"));

/* 
	Routing APIs
*/
app.use("/profile", profile);
app.use("/login", authorize);
app.use("/addPost", addPost);
app.use("/addUser", addUser);

/* 
	Default Action
*/
app.get("*", (req, res) => {
	console.log(
		'path.resolve(__dirname, "public", "build", "index.html)"',
		path.resolve(__dirname, "public", "build", "index.html")
	);
	res.sendFile(path.resolve(__dirname, "public", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
