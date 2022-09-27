import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("messages", (table) => {
    table.uuid("uuid").primary().index()
    table.string("picture").notNullable()
    table.string("username").notNullable()
    table.string("email").notNullable()
    table.string("content").notNullable()
    table.boolean("vu").defaultTo(false)
    table.timestamp("date")
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("messages")
}
