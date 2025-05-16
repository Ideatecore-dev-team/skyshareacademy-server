/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("talent_school", (table) => {
    table.increments("id").primary().unsigned();
    table
      .integer("talent_id")
      .unsigned()
      .references("id")
      .inTable("talent")
      .onDelete("cascade")
      .onUpdate("cascade");
    table
      .integer("school_id")
      .unsigned()
      .references("id")
      .inTable("school")
      .onDelete("cascade")
      .onUpdate("cascade");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("talent_school");
};
