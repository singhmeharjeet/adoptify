const { Pool } = require("pg");
const pool = new Pool({
	connectionString:
		process.env.DATABASE_URL ||
		"postgres://postgres:root@localhost/adoptify", 
	// ssl: {
	// 	rejectUnauthorized: false,
	// },
});

module.exports = pool
