import { createSlice, current } from "@reduxjs/toolkit"

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
    },
    removeBlog(state, action) {
      return state.filter(blog =>
        blog.id !== action.payload.id
      )
    },
    addLike(state, action) {
      const blogToUpdate = state.find(blog => blog.id === action.payload.id)
      const updatedBlog = { ...blogToUpdate, likes: action.payload.likes }
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    addComment(state, action) {
      const blogToUpdate = state.find(blog => blog.id === action.payload.id)
      const currentComments = current(blogToUpdate.comments)
      const updatedCommentList = currentComments.concat(action.payload)
      const updatedBlog = { ...blogToUpdate, comments: updatedCommentList }
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    }
  }
})

export const { setBlogs, addBlog, removeBlog, addLike, addComment } = blogSlice.actions

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

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      const response = await blogService.deleteBlog({ id: blog.id })
      dispatch(removeBlog({ id: blog.id }))
      dispatch(setNotification(
        `Blog '${blog.title}' by '${blog.author}' deleted`,
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

export const updateLikes = (blog) => {
  return async dispatch => {
    try {
      const response = await blogService.updateLikes({ id: blog.id, likes: blog.likes })
      dispatch(addLike({ id: blog.id, likes: JSON.parse(response.config.data).likes }))
    } catch (error) {
      dispatch(setNotification(
        `Error ${error.response.status}: ${error.response.data.error}`,
        "bad"
      ))
    }
  }
}

export const createComment = (blog) => {
  return async dispatch => {
    try {
      const response = await blogService.createComment({ id: blog.id, comment: blog.comment })
      dispatch(addComment({ id: blog.id, comment: JSON.parse(response.config.data).comment }))
    } catch (error) {
      dispatch(setNotification(
        `Error ${error}`,
        "bad"
      ))
    }
  }
}

export default blogSlice.reducer