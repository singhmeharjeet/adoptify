const cors = require("cors");
const path = require("path");


const express = require("express"),
	authorize = require("./routers/login.js"),
	addPost = require("./routers/add.js");


// --  MVC Hello
// app.js --- n numbers of Routes --- n number of controller

//left is the environment variable for production, and 5000 is for local
const PORT = process.env.PORT || 5010;

const app = express();
app.use(cors());
app.use(express.json()); // we will send a json so try to understand it
app.use(express.urlencoded({ extended: false })); // we are sending a false type

app.use(express.static("public/build"));
app.use(express.static("public"));


app.use("/login", authorize);
app.use("/addPost", addPost);


app.get("*", (req, res) => {
	console.log(
		'path.resolve(__dirname, "public", "build", "index.html)"',
		path.resolve(__dirname, "public", "build", "index.html")
	);
	res.sendFile(path.resolve(__dirname, "public", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
