import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FitnessJourney from "../../api";
import UserContext from "../auth/UserContext";

const NewLog = () => {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const username = currentUser.username;
  let date = new Date();

  const [log, setLog] = useState({
    date: `${date}`,
    username: username,
  });

  /** Add Log */

  const addLog = async (log) => {
    let res = await FitnessJourney.addLog(log);
    setLog(res);

    history.push(`/logs/${username}`);
  };

  /** Cancel routine creation and redirect to routines */

  const cancel = () => history.push(`/logs/${username}`);

  return (
    <div className="NewLogForm py-4">
      <div className="container">
        <div className="col-md-10 offset-md-1">
          <section id="breadcrumb">
            <nav aria-label="breadcrumb">
              <div class="d-flex justify-content-between align-items-center">
                <h2></h2>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>
                  <li class="breadcrumb-item">
                    <Link
                      to={`/logs/${currentUser.username}`}
                      style={{ textDecoration: "none" }}
                    >
                      Logs
                    </Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Routine
                  </li>
                </ol>
              </div>
            </nav>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NewLog;
