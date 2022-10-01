require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV;

console.log('KNEX ENV', process.env.DB_URL);

export const knex = require('knex')({
	client: 'pg',
	connection: process.env.DB_URL,
	debug: NODE_ENV === 'development',
	ssl: NODE_ENV !== 'development' && {
		sslmode: 'require',
		rejectUnauthorized: false,
	},
});
