/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("article", (table) => {
    table.increments("id").primary().unsigned();
    table.string("image_heading").notNullable();
    table.string("title").notNullable();
    table.text("content").notNullable();
    table.string("link");
    table
      .integer("admin_id")
      .unsigned()
      .references("id")
      .inTable("admin")
      .onDelete("cascade")
      .onUpdate("cascade");
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("category");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("article");
};
