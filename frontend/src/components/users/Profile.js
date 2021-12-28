import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

import LoadingPage from "../common/LoadingPage";
import FitnessJourney from "../../api";
import UserContext from "../auth/UserContext";

/** Profile Component
 *
 * Fetches user data from database.
 *
 */

const UserProfile = () => {
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState(null);

  /** Request post from API via postId */

  useEffect(
    function getUserOnMount() {
      async function getUser() {
        let user = await FitnessJourney.getCurrentUser(currentUser.username);
        // set user state to the handle
        setUser(user);
      }

      getUser();
    },
    // rerun when username changes
    [currentUser.username]
  );

  if (!user) return <LoadingPage />;

  return (
    <div className="Profile container">
      <div className="row full-width">
        <div id="profile-avatar" className="col-sm-6 col-md-4">
          <img src={currentUser.imageUrl} className="img-thumbnail" />
        </div>
        <div className="col-sm-6 col-md-4">
          <h1>@{currentUser.username}</h1>
          <p className="user-bio">{currentUser.bio}</p>
          <p className="user-location">
            <span className="fa fa-map-marker"></span> {currentUser.city},{" "}
            {currentUser.state}
          </p>
          <p>{currentUser.fitnessType}</p>
        </div>

        <div className="col-sm-6 col-md-4">
          <div>
            <Link to="/athlete/edit">
              <button className="container btn btn-outline-secondary m-2">
                Edit Profile
              </button>
            </Link>
          </div>
          <div>
            <button className="container btn btn-outline-danger m-2">
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
