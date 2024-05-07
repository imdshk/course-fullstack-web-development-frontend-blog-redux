import { useDispatch, useSelector } from "react-redux"

import { logoutUser } from "../reducers/userReducer"

const Userstatus = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem("loggedBlogappUser")
    dispatch(logoutUser())
  }

  return(
    <div>
      {user.name} logged in
      <br />
      <br />
      <button onClick={handleLogout} id="logout-button">
          logout
      </button>
    </div>
  )
}

export default Userstatus