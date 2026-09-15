/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("task_submissions", (table) => {
    table.increments("id").primary().unsigned();
    table
      .integer("student_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("student_accounts")
      .onDelete("CASCADE");
    table
      .integer("event_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("portal_events")
      .onDelete("CASCADE");
    table.string("file_url").notNullable();
    table.string("file_name").nullable();
    table
      .enu("status", ["submitted", "reviewed", "revision"])
      .defaultTo("submitted");
    table.text("mentor_note").nullable();
    table.timestamp("submitted_at").defaultTo(knex.fn.now());
    table.timestamp("reviewed_at").nullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("task_submissions");
};
