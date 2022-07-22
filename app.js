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
const post = require("./routers/post.js");
const addUser = require("./routers/addUser.js");
const admin = require("./routers/admin.js");
const removePost = require("./routers/deletePost.js");
const removeUser = require("./routers/deleteUser.js");
const editPost = require("./routers/editPost.js");

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
app.use(express.static("public/build")); // for pushing onto heroku
app.use(express.static("public")); // for pushing onto heroku


/* 
	Routing APIs
*/
app.use("/profile", profile);
app.use("/login", authorize);
app.use("/addPost", addPost);
app.use("/post", post);
app.use("/addUser", addUser);
app.use("/allData", admin);
app.use("/delete", removePost);
app.use("/deleteUser", removeUser);
app.use("/editPost", editPost);

/* 
	Default Action
*/
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "public", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
