import React from "react"
import { UserNavbar } from "./features/user/UserNavbar"
import { UserLogin } from "./features/user/UserLogin"

const appStyle = {
  maxWidth: "1200px",
  minHeight: "70%",
  margin: "0px auto",
  padding: "0px 10px",
}

function App() {
  return (
    <div style={appStyle}>
      <UserNavbar />
      <UserLogin />
    </div>
  )
}

export default App
