import { useEffect } from "react"
import  { useDispatch, useSelector } from "react-redux"

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
    <div>
      <h1>Users</h1>
      <tr><th></th><th><b>blogs created</b></th></tr>
      {users.map(user =>
        <>
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        </>
      )}
    </div>
  )
}

export default Users