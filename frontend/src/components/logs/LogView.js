import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

import "./LogView.css";
import LoadingPage from "../common/LoadingPage";

/** Render a single log
 *
 * - show edit/delete buttons (& call parent on action)
 */

const LogView = ({ log, toggleEdit, deleteLog }) => {
  const { currentUser } = useContext(UserContext);
  let sameUser;

  if (currentUser.username === log.username) {
    sameUser = true;
  } else {
    sameUser = false;
  }

  const userEditBtns = () => {
    return (
      <div className="RoutineView-editArea">
        <i className="fas fa-edit text-primary icon" onClick={toggleEdit} />
        <i className="fas fa-times text-danger icon" onClick={deleteLog} />
      </div>
    );
  };

  if (!log) return <LoadingPage />;

  return (
    <div className="LogView container mb-5">
      <div className="col-md-8 offset-md-2">
        <div className="text-center mb-4">
          <h1>{log.date}</h1>
          <small>
            Created by{" "}
            <Link
              to={`/athletes/${log.username}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {log.username}
            </Link>
          </small>
        </div>

        <div className="row"></div>
        <div className="LogView-right">{sameUser ? userEditBtns() : null}</div>
      </div>
    </div>
  );
};

export default LogView;
