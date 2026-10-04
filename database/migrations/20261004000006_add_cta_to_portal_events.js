/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const hasCtaLink = await knex.schema.hasColumn("portal_events", "cta_link");
  if (!hasCtaLink) {
    await knex.schema.alterTable("portal_events", (table) => {
      table.string("cta_link").nullable();
      table.string("cta_label").nullable();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const hasCtaLink = await knex.schema.hasColumn("portal_events", "cta_link");
  if (hasCtaLink) {
    await knex.schema.alterTable("portal_events", (table) => {
      table.dropColumn("cta_link");
      table.dropColumn("cta_label");
    });
  }
};
