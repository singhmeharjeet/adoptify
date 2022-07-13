const { Pool } = require("pg");
const pool = new Pool({
	connectionString:
		process.env.DATABASE_URL ||
		"postgres://postgres:root123@localhost/postgres",
	// ssl: {
	// 	rejectUnauthorized: false,
	// },
});

module.exports = pool
