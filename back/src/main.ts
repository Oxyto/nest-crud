import { NestFactory } from "@nestjs/core"
import { SocketsModule } from "./sockets.module"
import * as dotenv from "dotenv"

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(SocketsModule)

  app.enableCors()
  await app.listen(process.env.HOST_PORT || 8080)
}
bootstrap()
