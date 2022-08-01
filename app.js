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
const removeUser = require("./routers/deleteUser.js");
const editUser = require("./routers/editUser.js");
const editProfilePic = require("./routers/editProfilePic.js");
const removePost = require("./routers/deletePost.js");
const editPost = require("./routers/editPost.js");
// const httpServer = require("http").createServer();
// const io = require("socket.io")(httpServer, {
// 	cors: {
// 		origin: "*",
// 		methods: ["GET", "POST"],
// 	},
// });

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
app.use("/editProfilePic", editProfilePic);
app.use("/editUser", editUser);
/* 
	Set Up Connection for messages
*/
// io.use(cors());
// io.on("connection", (socket) => {
// 	const id = socket.handshake.query.id;
// 	console.log("id", id);
// 	socket.join(id);

// 	socket.on("send-message", (key, message) => {
// 		console.log("key", key);
// 		socket.to(message.receiver_id).emit("receive-message", {
// 			key,
// 			receiver_id: message.receiver_id,
// 			sender_id: message.sender_id,
// 			text: message.message,
// 			time_stamp: message.time_stamp,
// 		});
// 	});
// });

/* 
	Default Action
*/
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "public", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
// httpServer.listen(PORT, () => console.log(`Listening on ${PORT}`));
