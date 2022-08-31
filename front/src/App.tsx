import "./App.css"
import Title from "./components/title"
import TextField from "./components/textField"
import MessagesThread from "./components/messagesThread"

function App() {
  return (
    <div>
      <Title>Faberchat</Title>
      <MessagesThread/>
      <TextField/>
    </div>
  )
}

export default App
