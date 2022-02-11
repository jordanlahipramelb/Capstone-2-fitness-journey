import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import LogEntryForm from "./LogEntryForm";

import "./LogView.css";
import LoadingPage from "../common/LoadingPage";

/** Render a single log
 *
 * - show edit/delete buttons (& call parent on action)
 */

const LogView = ({
  log,
  toggleEdit,
  deleteLog,
  logEntries,
  routinesWithExercises,
  addEntry,
  deleteEntry,
}) => {
  const { currentUser } = useContext(UserContext);
  let sameUser;

  if (currentUser.username === log.username) {
    sameUser = true;
  } else {
    sameUser = false;
  }

  const userEditBtns = () => {
    return (
      <>
        <div>
          <button
            className="btn btn-secondary btn-lg mx-1"
            onClick={toggleEdit}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-lg"
            title="Delete Log"
            onClick={deleteLog}
          >
            X
          </button>
        </div>
        <LogEntryForm
          logEntries={logEntries}
          routinesWithExercises={routinesWithExercises}
          addEntry={addEntry}
          deleteEntry={deleteEntry}
        />
      </>
    );
  };

  if (!log) return <LoadingPage />;

  console.log(logEntries);
  return (
    <div className="LogView container mb-5">
      <div className="col-md-10 offset-md-1">
        <section id="breadcrumb" className="pb-2">
          <nav aria-label="breadcrumb">
            <div class="d-flex justify-content-between align-items-center">
              <h2>Workout</h2>
              <ol class="breadcrumb">
                <li class="breadcrumb-item past">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    Home
                  </Link>
                </li>
                <li class="breadcrumb-item">
                  <Link to="/logs" style={{ textDecoration: "none" }}>
                    Logs
                  </Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Log
                </li>
              </ol>
            </div>
          </nav>
        </section>
      </div>

      <div className="col-md-8 offset-md-2">
        <div className="text-center mb-4">
          <h1>{log.date}</h1>
          <small>
            Logged by{" "}
            <Link
              to={`/athletes/${log.username}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {log.username}
            </Link>
          </small>
        </div>

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Exercise</th>
              <th scope="col">Set Number</th>
              <th scope="col">Reps</th>
              <th scope="col">Weight</th>
            </tr>
          </thead>
          <tbody>
            {log.entries.map((entry) => (
              <tr>
                <th scope="row">{entry.exerciseName}</th>
                <td>{entry.setNumber}</td>
                <td>{entry.reps}</td>
                <td>{entry.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center">{sameUser ? userEditBtns() : null}</div>
    </div>
  );
};

export default LogView;
