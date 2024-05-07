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
import User from "./components/User"
import Blog from "./components/Blog"

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
      <>
        <Notification />
        <h1>blogs</h1>
        {
          user === null ?
            <Navigate replace to="/login" /> :
            <Userstatus />
        }
        <Routes>
          <Route path="/blogs/:id" element={
            user === null ?
              <Navigate replace to="/login" /> :
              <Blog />
          } />
          <Route path="/users/:id" element={
            user === null ?
              <Navigate replace to="/login" /> :
              <User />
          } />
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
      </>
    </Router>
  )
}

export default App