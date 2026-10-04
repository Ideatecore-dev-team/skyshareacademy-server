/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // Memastikan constraint benar-benar dihapus jika migration sebelumnya terlewat
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
  // no-op
};
