import { createSlice } from "@reduxjs/toolkit"

import blogService from "../services/blogs"

import { setNotification } from "../reducers/notificationReducer"


const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setBlogs, addBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    blogService
      .getAll()
      .then(blogs => {
        blogs.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
        dispatch(setBlogs(blogs))
      })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const response = await blogService.createBlog(blog)
      dispatch(addBlog(response))
      dispatch(setNotification(
        `a new blog '${response.title}' by '${response.author}' added`,
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

export default blogSlice.reducer