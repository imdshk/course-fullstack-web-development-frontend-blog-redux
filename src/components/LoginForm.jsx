import { useState } from "react"
import { useDispatch } from "react-redux"

import propTypes from "prop-types"

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

  return(
    <form onSubmit={ handleLogin }>
      <div>
        username
        <input
          value={username}
          onChange={handleUsernameChange}
          type="text"
          id="login-input-username"
        />
      </div>
      <div>
        password
        <input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          id="login-input-password"
        />
      </div>
      <button type="submit" id="login-button">
          login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  handleUsernameChange: propTypes.func.isRequired,
  handlePasswordChange: propTypes.func.isRequired
}

export default LoginForm