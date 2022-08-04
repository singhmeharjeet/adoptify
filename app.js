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
const editPostImage = require("./routers/editPostImage.js");

/* 
	Setup Server app
*/
const app = express();
const PORT = process.env.PORT || 5010;

/*
	Set Socket Connection
*/
// const httpServer = require("http").createServer(app);
// const io = require("socket.io")(httpServer, {
// 	cors: {
// 		origin: "*",
// 	},
// });
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
app.use("/editPostImage", editPostImage);

// /* 
// 	Set Up Connection for messages
// */
// io.on("connection", (socket) => {
// 	// console.log("what is the socket", socket);
// 	const id = socket?.handshake?.query?.id;

// 	// Join the room to see messages
// 	socket.join(id);

// 	// Create a room (conversation)
// 	socket.on("send-message", async (payload) => {
// 		const data = await payload;

// 		// Emit the message back to other client
// 		socket.emit("receive-message", {
// 			conversationKey: data?.conversationKey,
// 			receiver_id: data?.receiver_id,
// 			sender_id: data?.sender_id,
// 			text: data?.text,
// 			time_stamp: data?.time_stamp,
// 		});
// 	});
// });

/* 
	Default Action
*/
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "public", "build", "index.html"));
});

<<<<<<< HEAD
// app.listen(PORT, () => console.log(`Listening on ${PORT}`));
httpServer.listen(5010), () => console.log(`Listening on ${5010}`);

module.exports = app;
=======
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
// httpServer.listen(5010), () => console.log(`Listening on ${5010}`);
>>>>>>> 99c98788f870cd2fa661e852fb96b4f73899fae3
