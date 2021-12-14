import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Homepage.css";

/** Homepage
 *
 * Shows welcome message or login/register buttons.
 *
 * App -> Routes -> Homepage
 */

const Homepage = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="font-weight-bold">Welcome to Your Fitness Journey</h1>
        {currentUser ? (
          <h2>Hello, {currentUser.firstName}!</h2>
        ) : (
          <p>
            <Link className="btn btn-primary m-3" to="/login">
              Log in
            </Link>
            <Link className="btn btn-primary" to="/register">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
