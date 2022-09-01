import { useState } from "react"
import { MessageModelRequest } from "./models"
import serverConfig from "./config"
import "./textField.css"

async function sendMessage(message: MessageModelRequest) {
  await fetch(
    `http://${serverConfig.host}:${serverConfig.port}${serverConfig.path}`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    },
  )
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
