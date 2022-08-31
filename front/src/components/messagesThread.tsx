import "./messagesThread.css"
import Message from "./message"
import { useEffect, useState } from "react"
import { MessageModel } from "./models"

function MessagesThread() {
  const [messages, setMessages] = useState([] as MessageModel[])

  async function getMessages() {
    const res = await fetch("http://localhost:8080/messages", {
      mode: "cors",
    })
    const data: MessageModel[] = await res.json()
    setMessages(data)
  }
  useEffect(() => {
    getMessages().catch(console.error)
  }, [])
  return (
    <div className="msg-thead">
      {messages.map((msg) => (
        <Message key={msg.date}>{msg}</Message>
      ))}
    </div>
  )
}

export default MessagesThread
