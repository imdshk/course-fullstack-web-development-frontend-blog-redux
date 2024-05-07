import { Link } from "react-router-dom"

const BlogList = ({ blog }) => {
  const blogStyle = {
    color: "black",
    background: "lightgray",
    fontSize: 20,
    padding: 10,
    borderStyle: "solid",
    borderRadius: 5,
    BorderColor: "black",
    marginBottom: 10
  }

  return(
    <div style={blogStyle} className="blog" >
      <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
    </div>
  )
}

export default BlogList