import "./messagesThread.css"
import Message from "./message"
import { MessageModel } from "./models"

function getMessages() {
  return [
    {
      username: "Louis De Macedo",
      content: "ehe, je suis marrant",
      date: new Date(),
    },
  ]
}

function MessagesThread() {
  const messages: MessageModel[] = getMessages()
  return (
    <div className="msg-thead">
      {messages.map((msg) => (
        <Message>{msg}</Message>
      ))}
    </div>
  )
}

export default MessagesThread
