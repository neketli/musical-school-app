const Pool = require('pg').Pool
const pool = new Pool({
	user: 'postgres',
	password: '25565',
	host: 'localhost',
	port: 5432,
	database: 'musical_school',
})

module.exports = pool
