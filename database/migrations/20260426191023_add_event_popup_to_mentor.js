/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("mentor", (table) => {
    table.boolean("is_event_active").defaultTo(false);
    table.string("event_image_url").nullable();
    table.string("event_cta_link").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("mentor", (table) => {
    table.dropColumn("is_event_active");
    table.dropColumn("event_image_url");
    table.dropColumn("event_cta_link");
  });
};
