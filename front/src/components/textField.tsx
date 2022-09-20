import { useState } from "react"
import { MessageModelRequest } from "./models"
import socket from "./config"
import "./textField.css"
import { decodeTokenCredentials } from "../utils"

function sendMessage(message: MessageModelRequest) {
  socket.send("message", message)
}

function TextField() {
  const [msg, setMsg] = useState("")
  const credentials = decodeTokenCredentials()
  const message = {
    picture: credentials.picture,
    username: credentials.name,
    content: msg,
  }

  return (
    <div className="text-field">
      <input
        value={msg}
        onChange={(event) => setMsg(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && msg) {
            setMsg("")
            sendMessage(message)
          }
        }}
        placeholder="Message..."
      />
      <button
        onClick={() => {
          if (msg) {
            setMsg("")
            sendMessage(message)
          }
        }}
      >
        Send
      </button>
    </div>
  )
}

export default TextField
