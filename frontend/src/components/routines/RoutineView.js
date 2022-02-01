import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import RoutineExerciseList from "./RoutineExerciseList";
import "./RoutineView.css";

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

  return (
    <div className="RoutineView">
      <div className="container col-md-8 offset-md-2">
        <div className="text-center mb-4">
          <h1>{routine[0].name}</h1>
          <small>Created by {routine[0].username}</small>
        </div>
        <p>{routine[0].description}</p>

        {routine.map((data) => (
          <div className="card my-3" key={data.dayofweek}>
            {data.exercises.length === 0 ? (
              <div className="card-body">
                <p className="text-center">No exercises in routine.</p>
              </div>
            ) : (
              <div className="card-body">
                <h4 className="card-title">Day {data.dayofweek}</h4>
                <RoutineExerciseList exercises={data.exercises} />
              </div>
            )}
          </div>
        ))}
        <div className="RoutineView-right">
          {sameUser ? userEditBtns() : null}
        </div>
      </div>
    </div>
  );
};

export default RoutineView;

/**
 * 
 *  {routine.map((data) => (
          <div className="card my-3" key={data.dayofweek}>
            <div className="card-body">
              <h4 className="card-title">Day {data.dayofweek}</h4>
              <RoutineExerciseList exercises={data.exercises} />
            </div>
          </div>
        ))}
 */
