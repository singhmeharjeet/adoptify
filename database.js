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

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "adoptify"
});

module.exports = pool;