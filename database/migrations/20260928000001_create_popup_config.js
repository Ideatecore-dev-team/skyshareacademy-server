/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("popup_config");
  if (!exists) {
    await knex.schema.createTable("popup_config", (table) => {
      table.increments("id").primary().unsigned();
      table.boolean("is_active").defaultTo(true);
      table.boolean("randomize").defaultTo(false);
      table.jsonb("popups").defaultTo("[]");
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    });

    await knex("popup_config").insert({
      is_active: false,
      randomize: true,
      popups: JSON.stringify([]),
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("popup_config");
};
