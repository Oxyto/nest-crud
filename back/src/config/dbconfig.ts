import knex from "knex"

const db = knex({
  client: "sqlite3",
  connection: {
    filename: ":memory:",
  },
  migrations: {
    directory: "dest/migrations",
    loadExtensions: [".js"],
  },
})

db.migrate.latest()

export default db
