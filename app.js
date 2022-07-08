const cors = require("cors");
const express = require("express");
const path = require("path");
const pool = require("./database");
const auth = require("./routers/auth");

console.log("Hello");
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

app.use("/auth", auth);

//  app.post("/addPost", async (req, res) => {
// 		var username = req.body.username;
// 		var petName = req.body.title;
// 		var species = req.body.species;
// 		var colour = req.body.color;
// 		var description = req.body.description;

// 		var petImageFName = req.body.image;
// 		const fileContent = fs.readFileSync(petImageFName);
// 		const params = {
// 			Bucket: "adoptifybucket",
// 			Key: "petImage.jpg",
// 			Body: fileContent,
// 		};
// 		s3.upload(params, async function (err, data) {
// 			if (err) throw err;
// 			var petImageURL = data.Location;
// 			const newPostQ = `INSERT INTO posts(pet_name, pet_species, pet_color, images, description, fk_username) VALUES
//     ('${petName}', '${species}', '${colour}', ARRAY ['${petImageURL}'], '${description}', '${username}');`;
// 			await pool.query(newPostQ);
// 		});
// 		res.send("New post added succesfully!");
//  });
// app.get("/", async (req, res) => {
// 	//var allusersquery = 'SELECT * FROM users INNER JOIN posts ON users.userid = posts.fk_userid';
// 	var allusersquery = "SELECT * FROM users";
// 	var allpostsquery = "SELECT * FROM posts";

// 	try {
// 		const usersresult = await pool.query(allusersquery);
// 		const postsresult = await pool.query(allpostsquery);
// 		const allUsersResults = usersresult.rows;
// 		const allPostsResults = postsresult.rows;

// 		// add user ids into a set
// 		const userset = new Set();
// 		for (let row of usersresult.rows) {
// 			userset.add(row.username);
// 		}

// 		// gather all the posts of that user
// 		const resultData = [];
// 		const allusers = [...userset];

// 		for (let username of allusers) {
// 			const usersFilteredResults = allUsersResults.filter(
// 				(user) => user.username === username
// 			);
// 			const postsFilteredResults = allPostsResults.filter(
// 				(post) => post.fk_username === username
// 			);

// 			const eachuser = {
// 				username: usersFilteredResults[0].username,
// 				password: usersFilteredResults[0].password,
// 				firstName: usersFilteredResults[0].firstname,
// 				lastName: usersFilteredResults[0].lastname,
// 				profilepicture: usersFilteredResults[0].profilepicture,
// 				phone: usersFilteredResults[0].phone,
// 				email: usersFilteredResults[0].email,
// 				address: usersFilteredResults[0].address,
// 				isadmin: usersFilteredResults[0].isadmin,
// 				posts: postsFilteredResults,
// 			};

// 			resultData.push(eachuser);
// 		}
// 		console.log(resultData);
// 		const data = { results: resultData };
// 		res.json(data);
// 	} catch (error) {
// 		res.end(error);
// 	}
// });

// app.post("/login", async (req, res) => {
// 	const requestedUsername = req.body.username;
// 	const requestedPassword = req.body.password;

// 	console.log("requestedUsername", requestedUsername);
// 	console.log("requestedPassword", requestedPassword);

// 	const userQuery = `select password from users where username = '${requestedUsername}'`;

// 	const actualPassword = (await pool.query(userQuery)).rows[0].password;

// 	console.log('actualPassword', actualPassword);
// 	if (requestedPassword === actualPassword) {
// 		res.json({
// 			token: requestedUsername,
// 		});
// 	} else {
// 		res.json({
// 			token: ""
// 		});
// 	}
// });

app.get("*", (req, res) => {
	console.log(
		'path.resolve(__dirname, "public", "build", "index.html)"',
		path.resolve(__dirname, "public", "build", "index.html")
	);
	res.sendFile(path.resolve(__dirname, "public", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
