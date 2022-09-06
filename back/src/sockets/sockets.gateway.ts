import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets"
import { Message } from "../message/message.entity"
import db from "../config/dbconfig"

@WebSocketGateway({ cors: true })
export class SocketsGateway implements OnGatewayConnection {
  @WebSocketServer() server: any

  private async getMessagesList() {
    return await db
      .select("*")
      .from("messages")
      .orderBy("id", "asc")
  }

  async handleConnection(client: any, ..._args: any[]) {
    client.emit("messages", await this.getMessagesList())
  }

  @SubscribeMessage("message")
  async handleMessage(
    _client: any,
    payload: any,
  ): Promise<WsResponse<Message | string>> {
    const message = new Message(payload[1], new Date())

    if (!message.check())
      return { event: "error", data: "Invalid message body" }
    await db.insert(message).into("messages")
    this.server.emit("message", message)
  }
}
