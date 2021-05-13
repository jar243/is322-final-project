import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAppSelector } from "./app/hooks"
import { UserNavbar } from "./features/user/UserNavbar"
import { UserLogin } from "./features/user/UserLogin"
import { selectLoggedIn } from "./features/user/userSlice"

const appStyle = {
  maxWidth: "1200px",
  minHeight: "70%",
  margin: "0px auto",
  padding: "0px 10px",
}

function App() {
  const loggedIn = useAppSelector(selectLoggedIn)
  return (
    <div style={appStyle}>
      <Route path="/login">
        <UserLogin />
      </Route>
      <Route path="/dashboard">
        {loggedIn === false && <Redirect to="/login" />}
        <UserNavbar />
        <h1>wasssupp</h1>
      </Route>
      <Route path="/">
        <Redirect to={loggedIn ? "/dashboard" : "/login"} />
      </Route>
    </div>
  )
}

export default App
