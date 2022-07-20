// const { Pool } = require("pg");
// const pool = new Pool({
// 	connectionString:
// 		process.env.DATABASE_URL ||
// 		"postgres://postgres:root123@localhost/postgres",
// 	// ssl: {
// 	// 	rejectUnauthorized: false,
// 	// },
// });

// module.exports = pool

const Pool = require("pg").Pool;


module.exports = pool({
	connectionString:
		process.env.DATABASE_URL ||
		"postgres://xexgimwa:J5U7ErIfY2algew3NcbEw2xqyCH1z-qA@heffalump.db.elephantsql.com/xexgimwa"
<<<<<<< HEAD
		|| "postgres://postgres:test@localhost/adoptify",
=======
		|| "postgres://postgres:root@localhost/adoptify",
>>>>>>> 9e93df6b85ff958e70589e7836011aead6c19629
	// ssl: {
	// 	rejectUnauthorized: false,
	// },
});


