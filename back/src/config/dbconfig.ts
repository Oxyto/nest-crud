import knex from "knex"
import * as redis from "redis"
import * as dotenv from "dotenv"

dotenv.config()

export const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "database",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWD || "password",
    database: process.env.DB_DATABASE || "public",
  },
  migrations: {
    directory: "dest/migrations",
    loadExtensions: [".js"],
  },
})
export const cache = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || "cache"}:${
    process.env.REDIS_PORT || 6379
  }`,
})

cache.connect().then()

db.migrate.latest()
