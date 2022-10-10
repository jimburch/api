import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("takes", (t) => {
    t.increments("id");
    t.string("take").notNullable();
    t.integer("hot").defaultTo(0);
    t.integer("cold").defaultTo(0);
    t.integer("shares").defaultTo(0);
    t.timestamps(true, true);
    t.timestamp("deleted_at").defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("takes");
}
