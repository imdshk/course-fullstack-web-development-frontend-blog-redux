import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Userstatus from "./components/Userstatus"
import BlogForm from "./components/BlogForm"
import Blog from "./components/Blog"
import Toggalable from "./components/Toggalable"

import { setNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"


import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username,
        password: password
      })

      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
      dispatch(setNotification(
        "login successful",
        "good"
      ))
    } catch (error) {
      dispatch(setNotification(
        `Error ${error.response.status}: ${error.response.data.error}`,
        "bad"
      ))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
    blogService.setToken(null)
  }

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          password={password}
          onUsernameChange={handleUsernameChange}
          onPasswordChange={handlePasswordChange}
        /> :
        <div>
          <h2>blogs</h2>
          <Userstatus onClick={handleLogout} name={user.name} />
          <br />
          <Toggalable buttonLabel="create blog">
            <BlogForm />
          </Toggalable>
          <br />
          <div className="blogs" >
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
              />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App