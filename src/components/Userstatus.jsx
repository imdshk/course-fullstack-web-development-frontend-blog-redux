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
    <>
      {user.name} logged in
      <button onClick={handleLogout} id="logout-button">
          logout
      </button>
    </>
  )
}

export default Userstatus