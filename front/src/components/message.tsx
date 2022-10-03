import { useState } from "react"
import "./message.css"
import { MessageModel } from "./models"

const MAX_DISPLAY_LEN = 100

interface MessageProps {
  children: MessageModel
}

export function Message(props: MessageProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="msg">
      <img src={props.children.picture} alt="PP" className="msg-icon" />
      <h3 className="msg-username">{props.children.username}</h3>
      <p className="msg-content">
        {props.children.content.length > MAX_DISPLAY_LEN && !visible
          ? props.children.content.slice(0, MAX_DISPLAY_LEN) + "..."
          : props.children.content}
      </p>
      {props.children.content.length > MAX_DISPLAY_LEN && !visible ? (
        <button onClick={() => setVisible(true)}>Voir plus</button>
      ) : null}
      <p className="msg-date">
        {new Date(props.children.date).toLocaleString()}
      </p>
      {props.children.vu && <p className="msg-vu">Vu</p>}
    </div>
  )
}
