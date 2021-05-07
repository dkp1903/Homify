const { Pool } = require('pg');

const {
	DB_HOST,
	DB_USER,
	DB_PORT,
	DB_DATABASE
} = process.env


const pool = new Pool({
	user: DB_USER,
	host: DB_HOST,
	database: DB_DATABASE,
	port: DB_PORT,
})

module.exports = pool;
