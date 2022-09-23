import "./App.css"
import { Title } from "./components/title"
import { TextField } from "./components/textField"
import { MessagesThread } from "./components/messagesThread"
import { decodeTokenCredentials } from "./utils"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"

function App() {
  if (localStorage.getItem("token") === null)
    return (
      <GoogleOAuthProvider clientId="219045032127-udocj5k0a865u5abkisib17us4t134m6.apps.googleusercontent.com">
        <div id="login">
          <h1>Welcome to Faberchat</h1>
          <p>You need to be logged in beforehand</p>
          <GoogleLogin
            onSuccess={(res) => {
              window.localStorage.setItem("token", res.credential as string)
              window.location.reload()
            }}
          />
        </div>
      </GoogleOAuthProvider>
    )
  return (
    <div>
      <p id="username">Connected as {decodeTokenCredentials().name}</p>
      <Title>Faberchat</Title>
      <MessagesThread />
      <TextField />
      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token")
          window.location.reload()
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default App
