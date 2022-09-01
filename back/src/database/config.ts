import knex from "knex"
import * as dotenv from "dotenv"

dotenv.config()

// const db = knex({
//   client: "pg",
//   connection: {
//     host: process.env.PG_HOST || "127.0.0.1",
//     port: Number(process.env.PG_PORT) || 3306,
//     user: process.env.PG_USER || "postgres",
//     password: process.env.PG_PASS || "password",
//     database: process.env.PG_DB || "public",
//   },
// })

const db = knex({
  client: "sqlite3",
  connection: {
    filename: ":memory:",
  },
})

db.schema
  .createTable("messages", (table) => {
    table.string("username").notNullable()
    table.string("content").notNullable()
    table.date("date").notNullable()
  })
  .then()

export default db
