import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets"
import { Message } from "./message/message.entity"
import { db, cache } from "./config/dbconfig"

@WebSocketGateway({ cors: true })
export class SocketsGateway implements OnGatewayConnection {
  @WebSocketServer() broadcast: any

  private async handleQueue(): Promise<void> {
    const lastMessages: string[] = await cache.lRange("msgQueue", 0, -1)

    try {
      await db
        .insert(lastMessages.map((msg) => JSON.parse(msg)))
        .into("messages")
      await cache.del("msgQueue")
    } catch (error) {
      console.error(error)
    }
  }

  private async getMessagesList() {
    return await db.select("*").from("messages").orderBy("id", "asc")
  }

  async handleConnection(clientConnection: any, ..._args: any[]) {
    clientConnection.emit("messages", await this.getMessagesList())
  }

  @SubscribeMessage("message")
  async handleMessage(_client: any, payload: any): Promise<WsResponse<string>> {
    const message = new Message(payload[1], new Date())

    if (!message.check())
      return { event: "error", data: "Invalid message body" }
    await cache.lPush("msgQueue", JSON.stringify(message))
    await this.handleQueue()
    this.broadcast.emit("message", message)
  }
}
