import { useState } from "react"
import "./textField.css"

function TextField() {
  const [value, setValue] = useState("")

  return (
    <div className="text-field">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && setValue("")}
        type="input"
        placeholder="Message..."
      />
      <button onClick={() => null}>Send</button>
    </div>
  )
}

export default TextField
