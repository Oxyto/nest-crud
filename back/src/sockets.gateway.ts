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
    const msgQueue: string[] = await cache.lRange("msgQueue", 0, -1)

    try {
      await cache.del("msgQueue")
      await db
        .insert(msgQueue.map((msg) => JSON.parse(msg)))
        .into("messages")
    } catch (error) {
      console.error(error)
      await cache.rPush("msgQueue", msgQueue)
    }
  }

  private async getMessagesList(): Promise<Message[]> {
    try {
      return await db.select("*").from("messages").orderBy("id", "asc")
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async handleConnection(clientConnection: any, ..._args: any[]) {
    clientConnection.emit("messages", await this.getMessagesList())
  }

  @SubscribeMessage("message")
  async handleMessage(_client: any, payload: any): Promise<WsResponse<string>> {
    const message = new Message(payload[1], new Date())

    if (!message.check())
      return { event: "error", data: "Invalid message body" }
    await cache.rPush("msgQueue", JSON.stringify(message))
    this.broadcast.emit("message", message)
    await this.handleQueue()
  }
}
