import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Userstatus from "./components/Userstatus"
import BlogForm from "./components/BlogForm"
import Blog from "./components/Blog"
import Toggalable from "./components/Toggalable"

import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUser } from "./reducers/userReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    const fetchUserData = () => {
      const response = window.localStorage.getItem("loggedBlogappUser")
      const userData = JSON.parse(response)
      dispatch(initializeUser(userData))
    }
    fetchUserData()
  }, [])

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm /> :
        <div>
          <h2>blogs</h2>
          <Userstatus />
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