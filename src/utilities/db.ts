require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV;

import knex from "knex";
import configs from "../../knexfile";

const config = configs[NODE_ENV || "development"];

const db = knex(config);

export default db;
