import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("messages", (table) => {
    table.bigInteger("id").index()
    table.string("picture").notNullable()
    table.string("username").notNullable()
    table.string("content").notNullable()
    table.date("date")
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("messages")
}
