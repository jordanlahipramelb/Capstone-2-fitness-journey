import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

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
    // rerun when username changes
    [username]
  );

  if (!user) return <LoadingPage />;

  return (
    <div className="Profile">
      <h1>{username}</h1>
    </div>
  );
};

export default UserProfile;
