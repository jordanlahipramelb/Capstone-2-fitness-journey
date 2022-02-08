import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import LoadingPage from "../common/LoadingPage";
import FitnessJourney from "../../api";

/** Profile Component
 *
 * Fetches user data from database.
 *
 */

const UserProfile = () => {
  const history = useHistory();
  const { username } = useParams();
  const [user, setUser] = useState(null);

  /** Request post from API via postId */

  useEffect(
    function getUserOnMount() {
      async function getUser() {
        let user = await FitnessJourney.getCurrentUser(username);
        // set user state to the handle
        setUser(user);
      }

      getUser();
    },
    // rerun when user changes
    [username]
  );

  if (!user) return <LoadingPage />;

  return (
    <div className="UserProfile py-4">
      <div className="col-md-8 offset-md-2">
        <div className="container">
          <section id="breadcrumb" className="pb-3">
            <nav aria-label="breadcrumb">
              <div class="d-flex justify-content-between align-items-center">
                <h2>Athlete</h2>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item past">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    {user.username}
                  </li>
                </ol>
              </div>
            </nav>
          </section>

          <div className="row">
            <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
              <img
                src={user.imageUrl}
                className="img-thumbnail rounded mx-auto d-block"
              />
            </div>
            <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
              <div className="card p-2 m-2">
                <div className="card-title">
                  <h4>@{user.username}</h4>
                </div>
                <div className="card-body">
                  <p>{user.bio}</p>
                  <p>
                    <span className="fa fa-map-marker"></span> {user.city},
                    {user.state}
                  </p>
                  <p>{user.fitnessType}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
              <div className="card p-2 m-2">
                <div className="card-body">
                  <h4 className="card-title">Routines</h4>
                  <ul className="list-group list-group-flush">
                    {user.routines.map((routine) => (
                      <Link
                        to={`/routines/${routine.id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        <li
                          className="list-group-item list-group-item-action"
                          key={routine.id}
                        >
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
                  <h4 className="card-title">Workouts Logged</h4>
                  <ul className="list-group list-group-flush">
                    <p>Placeholder</p>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
