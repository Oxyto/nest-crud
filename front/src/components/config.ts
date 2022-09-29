import { io } from "socket.io-client"

const serverConfig = {
  host: "localhost",
  port: "8080",
}

export const socket = io(`ws://${serverConfig.host}:${serverConfig.port}`, {
  extraHeaders: {
    Authorization: window.localStorage.getItem("token") as string,
  },
})

socket.on("logout", (context: object) => {
  console.error(context)
  window.localStorage.removeItem("token")
  window.location.reload()
})
