import { io } from "socket.io-client"

const serverConfig = {
  host: "localhost",
  port: "8080",
}

const socket = io(
  `ws://${serverConfig.host}:${serverConfig.port}`,
)

export default socket
