import { useParams, Navigate } from "react-router-dom"

import  { useSelector } from "react-redux"

const User = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const user = users.find(user => user.id === id)
  return (
    <>
      {users.length === 0 ?
        <Navigate replace to="/users" /> :
        <div>
          <h1>{user.name}</h1>
          <h2>added blogs</h2>
          <ul>
            {user.blogs.map(blog =>
              <li key={blog.id}>
                {blog.title}
              </li>
            )}
          </ul>
        </div>
      }
    </>
  )
}

export default User