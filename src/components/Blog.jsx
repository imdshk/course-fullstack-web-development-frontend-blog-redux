import { useParams, Navigate, Link } from "react-router-dom"
import  { useSelector, useDispatch } from "react-redux"

import { deleteBlog, updateLikes } from "../reducers/blogReducer"

const Blog = () => {
  const id = useParams().id
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blog = blogs.find(blog => blog.id === id)

  const removeButtonStyle = {
    backgroundColor: "#f44336",
    color: "white"
  }

  const showDeleteButton = { display: user.username === blog.user.username ? "" : "none" }

  const addLikes = (event) => {
    event.preventDefault()
    dispatch(updateLikes({
      id: blog.id,
      likes: blog.likes + 1
    }))
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog({
        id: blog.id,
        title: blog.title,
        author: blog.author,
      }))
    }
  }

  return (
    <>
      <h1>{blog.title} by {blog.author}</h1>
      <p>
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes
        <button onClick={addLikes} id="blog-button-like">like</button>
        <br />
        added by {blog.user.name}
        <br />
        {showDeleteButton.display === "" ?
          <button onClick={removeBlog} style={removeButtonStyle}  id="blog-button-delete">delete</button> :
          <></>
        }
      </p>
    </>
  )
}

export default Blog