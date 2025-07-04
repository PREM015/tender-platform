/**
 * @param { import('knex').Knex } knex
 */
export async function up(knex) {
  await knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.timestamps(true, true);
    })
    .createTable("companies", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
      table.string("company_name").notNullable();
      table.string("industry").notNullable();
      table.text("description");
      table.string("logo_url");
      table.timestamps(true, true);
    })
    .createTable("tenders", (table) => {
      table.increments("id").primary();
      table.integer("company_id").unsigned().references("id").inTable("companies").onDelete("CASCADE");
      table.string("title").notNullable();
      table.text("description").notNullable();
      table.date("deadline").notNullable();
      table.integer("budget").notNullable();
      table.timestamps(true, true);
    })
    .createTable("applications", (table) => {
      table.increments("id").primary();
      table.integer("tender_id").unsigned().references("id").inTable("tenders").onDelete("CASCADE");
      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
      table.text("message").notNullable();
      table.integer("expected_budget");
      table.string("resume_url");
      table.timestamps(true, true);
    });
}

/**
 * @param { import('knex').Knex } knex
 */
export async function down(knex) {
  await knex.schema
    .dropTableIfExists("applications")
    .dropTableIfExists("tenders")
    .dropTableIfExists("companies")
    .dropTableIfExists("users");
}
