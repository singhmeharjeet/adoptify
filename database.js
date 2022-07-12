const { Pool } = require("pg");
const pool = new Pool({
	connectionString:
		process.env.DATABASE_URL ||
		"postgres://postgres:han95113427@localhost/adoptify",
	// ssl: {
	// 	rejectUnauthorized: false,
	// },
});

module.exports = pool
