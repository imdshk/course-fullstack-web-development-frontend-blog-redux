import { useSelector } from "react-redux"

import BlogForm from "../components/BlogForm"
import Blog from "../components/Blog"
import Toggalable from "../components/Toggalable"

const Home = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  return (
    <div>
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
  )
}

export default Home