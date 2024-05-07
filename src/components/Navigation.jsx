import { Link } from "react-router-dom"

import Userstatus from "../components/Userstatus"

const Navigation = () => {
  const navigationStyle = {
    color: "black",
    background: "lightgray",
    fontSize: 20,
    padding: 10,
    marginBottom: 10
  }

  const linkStyle = {
    padding: 5,
  }

  return (
    <div style= {navigationStyle} className="navigation">
      <Link style={linkStyle} to="/">blogs</Link>
      <Link style={linkStyle} to="/users">users</Link>
      <Userstatus />
    </div>
  )
}

export default Navigation