import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("messages", (table) => {
    table.index("id").increments()
    table.string("username").notNullable()
    table.string("content").notNullable()
    table.date("date").notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("messages")
}
