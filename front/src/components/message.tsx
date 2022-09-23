import "./message.css"
import { MessageModel } from "./models"

interface MessageProps {
  children: MessageModel
}

export function Message(props: MessageProps) {
  return (
    <div className="msg">
      <img src={props.children.picture} alt="PP" className="msg-icon" />
      <h3 className="msg-username">{props.children.username}</h3>
      <p className="msg-content">{props.children.content}</p>
      <p className="msg-date">{props.children.date}</p>
    </div>
  )
}
