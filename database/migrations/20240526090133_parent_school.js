/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("parent_school", (table) => {
    table.increments("id").primary().unsigned();
    table
      .integer("parent_id")
      .unsigned()
      .references("id")
      .inTable("parent")
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
  return knex.schema.dropTable("parent_school");
};
