/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema
    .createTable("accounts", (table) => {
      table.increments("account_number").primary();
      table.string("firstname").notNullable();
      table.string("lastname").notNullable();
      table.string("username").notNullable().unique();
      table.string("password").notNullable();
      table.decimal("balance", 11, 2).notNullable().defaultTo(0);
      table.string("token");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .raw("ALTER TABLE accounts AUTO_INCREMENT = 2580000000");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists("accounts");
