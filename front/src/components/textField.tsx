import { useState } from "react"
import { MessageModelRequest } from "./models"
import socket from "./config"
import "./textField.css"

function sendMessage(message: MessageModelRequest) {
  socket.send("message", message)
}

function TextField() {
  const [msg, setMsg] = useState("")
  const [name, setName] = useState("Anonymous")

  return (
    <div className="text-field">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && name && msg) {
            setMsg("")
            sendMessage({
              username: name,
              content: msg,
            })
          }
        }}
        placeholder="Username"
      />
      <input
        value={msg}
        onChange={(event) => setMsg(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && name && msg) {
            setMsg("")
            sendMessage({
              username: name,
              content: msg,
            })
          }
        }}
        placeholder="Message..."
      />
      <button
        onClick={() => {
          if (name && msg) {
            setMsg("")
            sendMessage({ username: name, content: msg })
          }
        }}
      >
        Send
      </button>
    </div>
  )
}

export default TextField
