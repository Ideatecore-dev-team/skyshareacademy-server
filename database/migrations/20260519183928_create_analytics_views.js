/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("analytics_views", (table) => {
    table.increments("id").primary().unsigned();
    table.string("ip_address").notNullable();
    table.string("path").notNullable();
    table.string("user_agent");
    table.string("referrer");
    table.integer("load_time_ms");
    table.integer("fcp_ms");
    table.integer("lcp_ms");
    table.float("cls");
    table.integer("fid_ms");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("analytics_views");
};
