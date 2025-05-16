/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("group", (table) => {
    table.increments("id").primary().unsigned();
    table.string("name").notNullable();
    table.string("link").notNullable();
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
  return knex.schema.dropTable("group");
};
