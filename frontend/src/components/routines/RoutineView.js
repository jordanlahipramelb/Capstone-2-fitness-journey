import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import RoutineExerciseList from "./RoutineExerciseList";
import "./RoutineView.css";
import LoadingPage from "../common/LoadingPage";

/** Render a single routine
 *
 * - show edit/delete buttons (& call parent on action)
 */

const RoutineView = ({ routine, toggleEdit, deleteRoutine }) => {
  const { currentUser } = useContext(UserContext);
  let sameUser;

  if (currentUser.username === routine[0].username) {
    sameUser = true;
  } else {
    sameUser = false;
  }

  const userEditBtns = () => {
    return (
      <div className="RoutineView-editArea">
        <i className="fas fa-edit text-primary icon" onClick={toggleEdit} />
        <i className="fas fa-times text-danger icon" onClick={deleteRoutine} />
      </div>
    );
  };

  if (!routine[0]) return <LoadingPage />;

  return (
    <div className="RoutineView container mb-5">
      <div className="col-md-8 offset-md-2">
        <div className="text-center mb-4">
          <h1>{routine[0].name}</h1>
          <small>
            Created by{" "}
            <Link
              to={`/athletes/${routine[0].username}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {routine[0].username}
            </Link>
          </small>
        </div>
        <p>{routine[0].description}</p>

        <div className="row">
          {" "}
          {routine.map((data) => (
            <div className="col-lg-6">
              <div className="card my-3 p-2" key={data.dayofweek}>
                {data.exercises.length === 0 ? (
                  <div className="card-body">
                    <p className="text-center">
                      Athlete has not added exercises yet.
                    </p>
                  </div>
                ) : (
                  <div className="card-body">
                    <h4 className="card-title">Day {data.dayofweek}</h4>
                    <RoutineExerciseList exercises={data.exercises} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="RoutineView-right">
          {sameUser ? userEditBtns() : null}
        </div>
      </div>
    </div>
  );
};

export default RoutineView;
