import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import UserContext from "../auth/UserContext";
// import "./Navbar.css";

/** Site-wide navigation bar
 *
 * Rendered by app.
 * logOut function prop passed in by App.
 *
 */

const Navigation = ({ logout }) => {
  /** currentUser: Provided from UserContext in App in order to obtain currentUser, which verifies if a user is logged in. */
  const { currentUser } = useContext(UserContext);

  // Navigation renders if user is logged in
  const loggedInUser = () => {
    return (
      <>
        <li className="nav-item">
          <Link to="/exercises" className="nav-link">
            Exercises
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/routines" className="nav-link">
            Routines
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/forum" className="nav-link">
            Forum
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/athlete" className="nav-link">
            {currentUser.first_name || currentUser.username}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={logout}>
            Log out
          </Link>
        </li>
      </>
    );
  };

  // Navigation renders if user is logged out
  const loggedOutUser = () => {
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
      </>
    );
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="mb-4">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Navbar.Brand href="/">Fitness Journey</Navbar.Brand>
            {currentUser ? loggedInUser() : loggedOutUser()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
