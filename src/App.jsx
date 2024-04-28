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
  // const [blogs, setBlogs] = useState([])
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

  // const handleLikes = async (likeObject) => {
  //   try {
  //     await blogService.updateLikes(likeObject)
  //     const blogToUpdate = blogs.find((blog) => blog.id === likeObject.id)
  //     const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
  //     setBlogs(prevState =>
  //       prevState.map(blog =>
  //         blog.id !== updatedBlog.id ? blog : updatedBlog
  //       )
  //     )
  //   } catch (error) {
  //     dispatch(setNotification(
  //       `Error ${error.response.status}: ${error.response.data.error}`,
  //       "bad"
  //     ))
  //   }
  // }

  // const handleDeleteBlog = async (blogToDelete) => {
  //   if (window.confirm(`Are you sure you want to delete ${blogToDelete.title} by ${blogToDelete.author}?`)){
  //     try {
  //       await blogService.deleteBlog({ id: blogToDelete.id })
  //       setBlogs(prevState =>
  //         prevState.filter(blog =>
  //           blog.id !== blogToDelete.id
  //         )
  //       )
  //       dispatch(setNotification(
  //         `Blog '${blogToDelete.title}' by '${blogToDelete.author}' deleted`,
  //         "good"
  //       ))
  //     } catch (error) {
  //       dispatch(setNotification(
  //         `Error ${error.response.status}: ${error.response.data.error}`,
  //         "bad"
  //       ))
  //     }
  //   }
  // }

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
                // updateLikes={handleLikes}
                // deleteBlog={handleDeleteBlog}
              />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App