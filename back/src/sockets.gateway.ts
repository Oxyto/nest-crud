import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets"
import { Message } from "./message/message.entity"
import db from "./config/dbconfig"

@WebSocketGateway({ cors: true })
export class SocketsGateway implements OnGatewayConnection {
  @WebSocketServer() broadcast: any

  private async getMessagesList() {
    return await db.select("*").from("messages").orderBy("id", "asc")
  }

  async handleConnection(clientConnection: any, ..._args: any[]) {
    clientConnection.emit("messages", await this.getMessagesList())
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
    this.broadcast.emit("message", message)
  }
}
