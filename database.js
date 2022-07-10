const { Pool } = require("pg");
const pool = new Pool({
	connectionString:
		process.env.DATABASE_URL ||
		"postgres://postgres:root123@localhost:5432/postgres",
	// ssl: {
	// 	rejectUnauthorized: false,
	// },
});

module.exports = pool
