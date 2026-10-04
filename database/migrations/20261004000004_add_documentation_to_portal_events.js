/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const hasColumn = await knex.schema.hasColumn(
    "portal_events",
    "documentation_urls"
  );
  if (!hasColumn) {
    await knex.schema.alterTable("portal_events", (table) => {
      table.jsonb("documentation_urls").defaultTo("[]");
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const hasColumn = await knex.schema.hasColumn(
    "portal_events",
    "documentation_urls"
  );
  if (hasColumn) {
    await knex.schema.alterTable("portal_events", (table) => {
      table.dropColumn("documentation_urls");
    });
  }
};
