const { Pool } = require("pg");
const pool = new Pool({
	connectionString:
		process.env.DATABASE_URL ||
		"postgres://postgres:123123123@localhost:5432/adoptify",
	// ssl: {
	// 	rejectUnauthorized: false,
	// },
});

module.exports = pool
