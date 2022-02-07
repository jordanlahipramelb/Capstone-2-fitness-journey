import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Profile.css";

import LoadingPage from "../common/LoadingPage";
import FitnessJourney from "../../api";
import UserContext from "../auth/UserContext";

/** Profile Component
 *
 * Fetches user data from database.
 *
 */

const CurrentUserProfile = () => {
  const history = useHistory();
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

  const deleteProfile = async () => {
    await FitnessJourney.deleteProfile(currentUser.username);

    history.push("/login");
    window.location.reload(true);
  };

  if (!user) return <LoadingPage />;

  console.log(currentUser.routines);

  return (
    <div className="UserDashboard">
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
            <img
              src={currentUser.imageUrl}
              className="img-thumbnail rounded mx-auto d-block"
            />
            <div className="d-flex justify-content-center">
              <Link to="/athlete/edit">
                <button className="btn btn-outline-secondary m-2">
                  Edit Profile
                </button>
              </Link>

              <button className="btn btn-danger m-2" onClick={deleteProfile}>
                Delete Profile
              </button>
            </div>
          </div>
          <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
            <div className="card p-2 m-2">
              <div className="card-title">
                <h1>@{currentUser.username}</h1>
              </div>
              <div className="card-body">
                <p>{currentUser.bio}</p>
                <p>
                  <span className="fa fa-map-marker"></span> {currentUser.city},
                  {currentUser.state}
                </p>
                <p>{currentUser.fitnessType}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
            <div className="card p-2 m-2">
              <div className="card-body">
                <h1 className="card-title">Routines</h1>
                <ul className="list-group list-group-flush">
                  {currentUser.routines.map((routine) => (
                    <Link
                      to={`/routines/${routine.id}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <li className="list-group-item list-group-item-action">
                        {routine.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
            <div className="card p-2 m-2">
              <div className="card-body">
                <h1 className="card-title">Workouts Logged</h1>
                <ul className="list-group list-group-flush">
                  <p>Placeholder</p>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserProfile;
