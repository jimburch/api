const NODE_ENV = process.env.NODE_ENV;
const DB_URL = process.env.DB_URL;

const knex = require('knex')({
	client: 'pg',
	connection: DB_URL,
	debug: NODE_ENV === 'development',
	ssl: NODE_ENV !== 'development' && {
		sslmode: 'require',
		rejectUnauthorized: false,
	},
});

export default knex;
