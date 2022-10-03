import "./textField.css"
import { useState } from "react"
import { MessageModelRequest } from "./models"
import { socket } from "./config"
import { decodeTokenCredentials } from "../utils"

const MAX_MSG_LEN = 3000

function sendMessage(message: MessageModelRequest) {
  socket.emit("newMessage", message)
}

export function TextField() {
  const [msg, setMsg] = useState("")
  const credentials = decodeTokenCredentials()
  const message = {
    picture: credentials.picture,
    username: credentials.name,
    email: credentials.email,
    content: msg,
  }

  return (
    <div className="text-field">
      <input
        autoFocus={true}
        value={msg}
        onChange={(event) => {
          if (event.target.value.length <= MAX_MSG_LEN)
            setMsg(event.target.value)
        }}
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
