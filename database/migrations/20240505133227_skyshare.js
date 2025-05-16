/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("skyshare", (table) => {
    table.increments("id").primary().unsigned();
    table.string("gambar_alur_acara").notNullable();
    table.string("gambar_timeline").notNullable();
    table.string("link_cta").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("skyshare");
};
