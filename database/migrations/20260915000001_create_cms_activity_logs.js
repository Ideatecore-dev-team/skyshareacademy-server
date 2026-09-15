/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cms_activity_logs", (table) => {
    table.increments("id").primary().unsigned();
    table
      .integer("admin_id")
      .unsigned()
      .references("id")
      .inTable("admin")
      .onDelete("SET NULL")
      .nullable();
    table.string("admin_name").notNullable();
    table.string("action", 500).notNullable();
    table.string("ip_address", 100).nullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("cms_activity_logs");
};
