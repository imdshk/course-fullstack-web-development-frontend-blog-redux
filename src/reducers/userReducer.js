import { createSlice } from "@reduxjs/toolkit"

import { setNotification } from "../reducers/notificationReducer"

import blogService from "../services/blogs"
import loginService from "../services/login"

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const initializeUser = (loggedUserJSON) => {
  return async dispatch => {
    if (loggedUserJSON) {
      dispatch(setUser(loggedUserJSON))
      blogService.setToken(loggedUserJSON.token)
    } else {
      dispatch(setUser(null))
    }}
}

export const loginUser = ({ username, password }) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username: username,
        password: password
      })
      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      dispatch(setUser(user))
      blogService.setToken(user.token)
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
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch(setUser(null))
    blogService.setToken(null)
  }
}

export default userSlice.reducer