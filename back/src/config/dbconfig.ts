import knex from "knex"

const db = knex({
  client: "sqlite3",
  connection: {
    filename: ":memory:",
  },
  migrations: {
    loadExtensions: [".js"],
  },
})

db.migrate.latest({ directory: "dest/migrations" })

export default db
