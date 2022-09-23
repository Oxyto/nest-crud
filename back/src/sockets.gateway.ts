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

  async handleConnection(clientConnection: any, ..._args: unknown[]) {
    clientConnection.emit("messages", await this.getMessagesList())
  }

  @SubscribeMessage("vu")
  async handleVu(_client: unknown, payload: unknown) {}

  @SubscribeMessage("message")
  async handleMessage(
    _client: unknown,
    payload: unknown,
  ): Promise<WsResponse<string>> {
    const message = new Message(payload[1], new Date())

    if (!message.check())
      return { event: "error", data: "Invalid message body" }
    await cache.rPush("msgQueue", JSON.stringify(message))
    this.broadcast.emit("message", message)
  }
}
