const { Pool } = require("pg");
const pool = new Pool({
	connectionString:
		process.env.DATABASE_URL ||
		"postgres://xexgimwa:J5U7ErIfY2algew3NcbEw2xqyCH1z-qA@heffalump.db.elephantsql.com/xexgimwa"
		|| "postgres://postgres:test@localhost/adoptify",
	// ssl: {
	// 	rejectUnauthorized: false,
	// },
});

module.exports = pool;
