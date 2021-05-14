import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAppSelector } from "./app/hooks"
import { UserNavbar } from "./features/user/UserNavbar"
import { UserLogin } from "./features/user/UserLogin"
import { InventoryList } from "./features/inventory/InventoryList"
import { selectLoggedIn } from "./features/user/userSlice"
import { InventoryEditor } from "./features/inventory/InventoryEditor"

const appStyle = {
  maxWidth: "1200px",
  minHeight: "70%",
  margin: "0px auto",
  padding: "0px 10px",
}

const rowStyle = {
  display: "flex",
  flexDirection: "row" as const,
  flexWrap: "wrap" as const,
  width: "100%",
}

const colStyle = {
  display: "flex",
  flexDirection: "column" as const,
  flexBasis: "100%",
  flex: "1",
  padding: "0px 25px",
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
        <div style={rowStyle}>
          <div style={colStyle}>
            <h1>Inventory List</h1>
            <InventoryList />
          </div>
          <div style={colStyle}>
            <h1>Inventory Editor</h1>
            <InventoryEditor />
          </div>
        </div>
      </Route>
      <Route path="/">
        <Redirect to={loggedIn ? "/dashboard" : "/login"} />
      </Route>
    </div>
  )
}

export default App
