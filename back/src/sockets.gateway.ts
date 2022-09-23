import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets"
import { Message } from "./message/message.entity"
import { db, cache } from "./config/dbconfig"
import { UseGuards } from "@nestjs/common"
import { AuthGuard } from "./auth.guard"
import { v4 } from "uuid"
import type { CreateMessageDto } from "./message/create-message.dto"

@UseGuards(AuthGuard)
@WebSocketGateway({ cors: true })
export class SocketsGateway implements OnGatewayConnection {
  @WebSocketServer() broadcast: any

  private async getMessagesList(): Promise<Message[]> {
    try {
      return await db.select("*").from("messages").orderBy("uuid", "asc")
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async handleConnection(
    clientConnection: any,
    ..._args: unknown[]
  ): Promise<void> {
    clientConnection.emit("messages", await this.getMessagesList())
  }

  @SubscribeMessage("vu")
  async handleVu(
    _client: unknown,
    payload: [string, [string, string]],
  ): Promise<void> {
    const [uuid, email] = payload[1]

    await db("messages")
      .update("vu", true)
      .where("uuid", uuid)
      .whereNot("email", email)
  }

  @SubscribeMessage("message")
  async handleMessage(
    _client: unknown,
    payload: [string, CreateMessageDto],
  ): Promise<WsResponse<string>> {
    const message = new Message(payload[1], new Date(), v4())

    if (!message.check())
      return { event: "error", data: "Invalid message body" }
    await cache.rPush("msgQueue", JSON.stringify(message))
    this.broadcast.emit("message", message)
  }
}
