import "./messagesThread.css"
import { Message } from "./message"
import { useEffect, useState, useRef } from "react"
import { socket } from "./config"
import { decodeTokenCredentials } from "../utils"
import type { MessageModel } from "./models"

function sendVu(message: MessageModel) {
  const email = message.email
  const uuid = message.uuid

  if (message.vu || email === decodeTokenCredentials().email) return
  socket.emit("vu", uuid)
}

function getVu(message: MessageModel, uuid: string) {
  if (!message.vu && message.uuid === uuid) message.vu = true
  return message
}

export function MessagesThread() {
  const [messages, setMessages] = useState<MessageModel[]>([])
  const messagesThreadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    socket.on("getVu", (uuid: string) => {
      setMessages(messages.map((message) => getVu(message, uuid)))
    })
    socket.on("loadMessages", (data: MessageModel[]) => {
      data.forEach(sendVu)
      setMessages(data)
    })
    socket.on("loadMessage", (data: MessageModel) => {
      sendVu(data)
      setMessages([...messages, data])
    })
    messagesThreadRef.current?.scrollTo(
      0,
      messagesThreadRef.current?.scrollHeight,
    )
  }, [messages])
  return (
    <div className="msg-thread" ref={messagesThreadRef}>
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
