import { useEffect } from "react"
import  { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getAllUsers } from "../reducers/usersReducer"

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUsers = () => {
      dispatch(getAllUsers())
    }
    fetchUsers()
  }, [])

  const users = useSelector(state => state.users)

  return (
    <>
      <h1>Users</h1>
      <thead>
        <tr>
          <th></th>
          <th><b>blogs created</b></th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </>
  )
}

export default Users