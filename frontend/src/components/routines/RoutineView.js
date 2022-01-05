import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import "./RoutineView.css";

/** Render a single routine
 *
 * - show edit/delete buttons (& call parent on action)
 */

const RoutineView = ({ routine, toggleEdit, deleteRoutine }) => {
  const { id, name, username, dayOfWeek, exercises } = routine;
  const { currentUser } = useContext(UserContext);
  let sameUser;

  if (currentUser.username === username) {
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
  console.log(routine);

  return (
    <div className="RoutineView">
      <div className="container">
        <h1>{routine[0].name}</h1>
        <small>Created by {routine[0].username}</small>
        <div>
          {routine.map((data) => (
            <div>
              <h4>{data.dayofweek}</h4>
              {data.exercises.map((exercise) => (
                <p>
                  {exercise.exerciseName}: {exercise.sets} sets of{" "}
                  {exercise.reps} reps
                </p>
              ))}
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
