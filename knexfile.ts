require("dotenv").config();
import { Knex } from "knex";

interface KnexConfig {
  [key: string]: Knex.Config;
}

const configs: KnexConfig = {
  development: {
    client: "pg",
    connection: process.env.DB_URL,
    debug: true,
  },

  staging: {
    client: "pg",
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      extension: "ts",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      extension: "ts",
    },
  },
};

export default configs;
