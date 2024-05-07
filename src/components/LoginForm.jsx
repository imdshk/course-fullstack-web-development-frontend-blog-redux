import { useState } from "react"
import { useDispatch } from "react-redux"
import { Table, Form, Button } from "react-bootstrap"

import { loginUser } from "../reducers/userReducer"
import { setNotification } from "../reducers/notificationReducer"

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      setUsername("")
      setPassword("")
    } catch (error) {
      dispatch(setNotification(
        `Error ${error.response.status}: ${error.response.data.error}`,
        "bad"
      ))
    }
  }

  const style = {
    padding: 5,
  }

  return(
    <div>
      <Form onSubmit={ handleLogin } style={style}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={handleUsernameChange}
            type="text"
            id="login-input-username"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={handlePasswordChange}
            type="password"
            id="login-input-password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm