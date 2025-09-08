/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("participant", (table) => {
  table.increments("id").primary().unsigned();
  table.string("nama").notNullable();
  table.string("email").notNullable();
  table.string("nama_instansi").notNullable();
  table.string("nama_daerah").notNullable();

  // Episode 1
  table.boolean("episode1_summary").notNullable().defaultTo(false);
  table.boolean("episode1_practice").notNullable().defaultTo(false);

  // Episode 2
  table.boolean("episode2_summary").notNullable().defaultTo(false);
  table.boolean("episode2_practice").notNullable().defaultTo(false);

  // Episode 3
  table.boolean("episode3_summary").notNullable().defaultTo(false);
  table.boolean("episode3_practice").notNullable().defaultTo(false);

  // Episode 4
  table.boolean("episode4_summary").notNullable().defaultTo(false);
  table.boolean("episode4_practice").notNullable().defaultTo(false);

  // Episode 5
  table.boolean("episode5_summary").notNullable().defaultTo(false);
  table.boolean("episode5_practice").notNullable().defaultTo(false);

  // Episode 6
  table.boolean("episode6_summary").notNullable().defaultTo(false);
  table.boolean("episode6_practice").notNullable().defaultTo(false);

  table.timestamp("createdAt").defaultTo(knex.fn.now());
  table.timestamp("updatedAt").defaultTo(knex.fn.now());
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("participant");
