/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("partner", (table) => {
    table.increments("id").primary().unsigned();
    table.string("gambar_sekolah").notNullable();
    table.string("nama_sekolah").notNullable();
    table.string("alamat_sekolah").notNullable();
    table.string("lokasi").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("partner");
};
