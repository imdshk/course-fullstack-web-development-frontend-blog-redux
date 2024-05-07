import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Home from "./components/Home"
import Userstatus from "./components/Userstatus"
import Users from "./components/Users"

import { initializeUser } from "./reducers/userReducer"
import { initializeBlogs } from "./reducers/blogReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserData = () => {
      const response = window.localStorage.getItem("loggedBlogappUser")
      const userData = JSON.parse(response)
      dispatch(initializeUser(userData))
    }
    fetchUserData()
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const user = useSelector(state => state.user)

  return (
    <Router>
      <div>
        <Notification />
        <h1>blogs</h1>
        <Userstatus />
        <br />
        <Routes>
          <Route path="/users" element={
            user === null ?
              <Navigate replace to="/login" /> :
              <Users />
          } />
          <Route path="/" element={
            user === null ?
              <Navigate replace to="/login" /> :
              <Home />
          } />
          <Route path="/login" element={
            user === null ?
              <LoginForm /> :
              <Navigate replace to="/" />
          }/>
        </Routes>
      </div>
    </Router>
  )
}

export default App