import "./messagesThread.css"
import Message from "./message"
import { useEffect, useState } from "react"
import { MessageModel } from "./models"
import socket from "./config"

function MessagesThread() {
  const [messages, setMessages] = useState([] as MessageModel[])

  useEffect(() => {
    socket.on("messages", (data) => setMessages(data))
    socket.on("message", (data) => setMessages([...messages, data]))
  }, [messages])
  return (
    <div className="msg-thead">
      <p>{messages.length ? "" : "Loading messages..."}</p>
      {messages.map((msg) => (
        <Message key={msg.date as string}>{msg}</Message>
      ))}
    </div>
  )
}

export default MessagesThread
