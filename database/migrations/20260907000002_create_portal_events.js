/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("portal_events", (table) => {
    table.increments("id").primary().unsigned();
    table.string("title").notNullable();
    table.text("description").nullable();
    table.timestamp("event_date").nullable();
    table.string("event_type", 50).defaultTo("workshop");
    table.string("thumbnail_url").nullable();
    table.enu("target_role", ["all", "mentor", "talent"]).defaultTo("all");
    table.boolean("is_active").defaultTo(true);
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("portal_events");
};
