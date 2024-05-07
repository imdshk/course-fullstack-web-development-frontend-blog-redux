import { Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"

import Userstatus from "../components/Userstatus"

const Navigation = ({ user }) => {
  const padding = {
    padding: 5,
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Userstatus />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation