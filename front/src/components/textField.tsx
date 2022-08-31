import { useState } from "react"
import "./textField.css"

function TextField() {
  const [msg, setMsg] = useState("")
  const [name, setName] = useState("Anonymous")

  return (
    <div className="text-field">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && name && setMsg("")}
        placeholder="Username"
      />
      <input
        value={msg}
        onChange={(event) => setMsg(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && name && setMsg("")}
        placeholder="Message..."
      />
      <button onClick={() => name && setMsg("")}>Send</button>
    </div>
  )
}

export default TextField
