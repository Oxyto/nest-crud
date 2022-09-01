import "./messagesThread.css"
import Message from "./message"
import { useEffect, useState } from "react"
import { MessageModel } from "./models"
import serverConfig from "./config"

function MessagesThread() {
  const [messages, setMessages] = useState([] as MessageModel[])

  async function getMessages() {
    const res = await fetch(
      `http://${serverConfig.host}:${serverConfig.port}${serverConfig.path}`,
      {
        mode: "cors",
      },
    )
    const msg_list = await res.json()

    setMessages(msg_list)
  }
  useEffect(() => {
    setInterval(() => getMessages().catch(console.error), 1000)
  }, [])
  return (
    <div className="msg-thead">
      {messages.map((msg) => (
        <Message key={msg.date as string}>{msg}</Message>
      ))}
    </div>
  )
}

export default MessagesThread
