/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
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

  // Convert target_role from enu to varchar(50) so it supports 'all', 'mentor', 'parent', 'talent'
  // Drop check constraint if created by knex enu, and ensure default is safely re-applied
  await knex.raw(`
    ALTER TABLE portal_events DROP CONSTRAINT IF EXISTS portal_events_target_role_check;
    ALTER TABLE portal_events ALTER COLUMN target_role DROP DEFAULT;
    ALTER TABLE portal_events ALTER COLUMN target_role TYPE varchar(50) USING target_role::varchar(50);
    ALTER TABLE portal_events ALTER COLUMN target_role SET DEFAULT 'all';
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const hasCategoryId = await knex.schema.hasColumn("portal_events", "category_id");
  if (hasCategoryId) {
    await knex.schema.alterTable("portal_events", (table) => {
      table.dropColumn("category_id");
    });
  }
};
