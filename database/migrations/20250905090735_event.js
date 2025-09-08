/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("event", (table) => {
    table.increments("id").primary().unsigned();
    table.string("event_image_url").notNullable();
    table.string("nama_event").notNullable();
    table.string("kategori").notNullable();
    table.integer("total_peserta").notNullable();
    table.text("deskripsi").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("event");
