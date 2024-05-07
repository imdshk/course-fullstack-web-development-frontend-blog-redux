import { useSelector } from "react-redux"

import BlogForm from "../components/BlogForm"
import BlogList from "./BlogList"
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
          <BlogList
            key={blog.id}
            blog={blog}
          />
        )}
      </div>
    </div>
  )
}

export default Home