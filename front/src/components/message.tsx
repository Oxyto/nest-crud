import "./message.css"
import { MessageModel } from "./models"

interface MessageProps {
  children: MessageModel
}

function Message(props: MessageProps) {
  return (
    <div className="msg">
      <img
        src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
        alt="PP"
        className="msg-icon"
      />
      <h3 className="msg-username">{props.children.username}</h3>
      <p className="msg-content">{props.children.content}</p>
      <p className="msg-date">{new Date(props.children.date).toDateString()}</p>
    </div>
  )
}

export default Message
