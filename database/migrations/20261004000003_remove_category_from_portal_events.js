/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const hasCategoryId = await knex.schema.hasColumn("portal_events", "category_id");
  if (hasCategoryId) {
    await knex.schema.alterTable("portal_events", (table) => {
      table.dropColumn("category_id");
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const hasCategoryId = await knex.schema.hasColumn("portal_events", "category_id");
  if (!hasCategoryId) {
    await knex.schema.alterTable("portal_events", (table) => {
      table
        .integer("category_id")
        .unsigned()
        .nullable()
        .references("id")
        .inTable("category")
        .onDelete("SET NULL");
    });
  }
};
