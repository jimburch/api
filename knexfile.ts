import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
	},

	staging: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
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
		connection: process.env.DATABASE_URL,
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

module.exports = config;
