import "./messagesThread.css"
import { Message } from "./message"
import { useEffect, useState } from "react"
import { MessageModel } from "./models"
import socket from "./config"

export function MessagesThread() {
  const [messages, setMessages] = useState<MessageModel[]>([])

  useEffect(() => {
    socket.on("messages", (data) => setMessages(data))
    socket.on("message", (data) => setMessages([...messages, data]))
  }, [messages])
  return (
    <div className="msg-thead">
      {messages.length === 0 ? (
        <p>Loading messages...</p>
      ) : (
        messages.map((msg) => <Message key={msg.date}>{msg}</Message>)
      )}
    </div>
  )
}
