import "./messagesThread.css"
import { Message } from "./message"
import { useEffect, useState } from "react"
import { MessageModel } from "./models"
import { socket } from "./config"
import { decodeTokenCredentials } from "../utils"

function sendVu(message: MessageModel) {
  const email = decodeTokenCredentials().email
  const uuid = message.uuid

  socket.send("vu", [uuid, email])
}

export function MessagesThread() {
  const [messages, setMessages] = useState<MessageModel[]>([])

  useEffect(() => {
    socket.on("messages", (data: MessageModel[]) => {
      data.forEach(sendVu)
      setMessages(data)
    })
    socket.on("message", (data: MessageModel) => {
      sendVu(data)
      setMessages([...messages, data])
    })
  }, [messages])
  return (
    <div className="msg-thead">
      {messages.length === 0 ? (
        <p>Loading messages...</p>
      ) : (
        messages.map((message) => (
          <Message key={message.date}>{message}</Message>
        ))
      )}
    </div>
  )
}
