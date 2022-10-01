require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV;

export const knex = require('knex')({
	client: 'pg',
	connection: process.env.DB_URL,
	debug: NODE_ENV === 'development',
	ssl: NODE_ENV !== 'development' && {
		sslmode: 'require',
		rejectUnauthorized: false,
	},
});
