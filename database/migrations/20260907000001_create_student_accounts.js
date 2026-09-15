/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("student_accounts", (table) => {
    table.increments("id").primary().unsigned();
    table.string("name").nullable();
    table.string("region").nullable();
    table.integer("age").nullable();
    table.string("occupation").nullable();
    table.string("email").nullable().unique();
    table.string("phone", 30).nullable().unique();
    table.string("password").nullable();
    table.enu("role", ["mentor", "talent"]).defaultTo("talent");
    table.string("google_id").nullable();
    table.string("otp_code", 10).nullable();
    table.timestamp("otp_expires_at").nullable();
    table.boolean("is_verified").defaultTo(false);
    table.boolean("is_active").defaultTo(true);
    table.string("profile_picture").nullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("student_accounts");
};
