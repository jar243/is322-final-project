import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  H2,
  Card,
  FormGroup,
  Label,
  InputGroup,
  Button,
  Callout,
} from "@blueprintjs/core"

import {
  setUsername,
  setPassword,
  login,
  selectStatus,
  selectUsername,
  selectPassword,
} from "./userSlice"

const cardStyle = {
  maxWidth: "400px",
  margin: "30px auto",
}

function mb(pixels: number) {
  return { marginBottom: pixels + "px" }
}

export function UserLogin() {
  const username = useAppSelector(selectUsername)
  const password = useAppSelector(selectPassword)
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()

  return (
    <div style={cardStyle}>
      <Card style={mb(40)}>
        <H2 style={mb(20)}>Welcome back!</H2>
        {status === "failed" && (
          <Callout style={mb(20)}>Invalid username or password</Callout>
        )}
        <FormGroup disabled={status === "pending"}>
          <Label>
            Username
            <InputGroup
              placeholder="john"
              disabled={status === "pending"}
              onChange={(e) => {
                dispatch(setUsername(e.target.value))
              }}
            />
          </Label>
          <Label style={mb(20)}>
            Password
            <InputGroup
              placeholder="password"
              type="password"
              disabled={status === "pending"}
              onChange={(e) => {
                dispatch(setPassword(e.target.value))
              }}
            />
          </Label>
          <Button
            disabled={status === "pending"}
            onClick={() => {
              dispatch(
                login({
                  username,
                  password,
                })
              )
            }}
          >
            Login
          </Button>
        </FormGroup>
      </Card>
      <Callout>
        Use the placeholder username and password values to login, or add your
        own to the db.json in the root dir <br /> <br />
        The login method I used with json-server gives the illusion of a normal
        login system but is completely insecure. In a real app I would use
        tokens, etc
      </Callout>
    </div>
  )
}
