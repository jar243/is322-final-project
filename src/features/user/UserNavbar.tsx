import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { Navbar, Alignment, Button } from "@blueprintjs/core"

import { selectLoggedIn, selectUsername, logout } from "./userSlice"

const navbarStyle = {
  marginTop: "10px",
  marginBottom: "10px",
}

export function UserNavbar() {
  const username = useAppSelector(selectUsername)
  const loggedIn = useAppSelector(selectLoggedIn)
  const dispatch = useAppDispatch()

  return (
    <Navbar style={navbarStyle}>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>IS322 Final Project</Navbar.Heading>
      </Navbar.Group>
      {loggedIn && (
        <Navbar.Group align={Alignment.RIGHT}>
          <Navbar.Heading>Hi, {username}</Navbar.Heading>
          <Button onClick={() => dispatch(logout())}>Logout</Button>
        </Navbar.Group>
      )}
    </Navbar>
  )
}
