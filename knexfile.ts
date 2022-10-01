require('dotenv').config();

module.exports = {
	development: {
		client: 'pg',
		connection: process.env.DB_URL,
	},

	staging: {
		client: 'pg',
		connection: process.env.DB_URL,
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
			extension: 'ts',
		},
	},

	production: {
		client: 'pg',
		connection: process.env.DB_URL,
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
			extension: 'ts',
		},
	},
};
