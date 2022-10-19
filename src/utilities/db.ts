require("dotenv").config();
import knex from "knex";
import configs from "../../knexfile";

const NODE_ENV = process.env.NODE_ENV;

const config = configs[NODE_ENV || "development"];

const db = knex(config);

export default db;
