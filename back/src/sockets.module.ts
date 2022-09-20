import { Module } from "@nestjs/common"
import { SocketsGateway } from "./sockets.gateway"

@Module({
  imports: [],
  controllers: [],
  providers: [SocketsGateway],
})
export class SocketsModule {}
