import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import RoutineExerciseList from "./RoutineExerciseList";
import "./RoutineView.css";

/** Render a single routine
 *
 * - show edit/delete buttons (& call parent on action)
 */

const RoutineView = ({ routine, toggleEdit, deleteRoutine }) => {
  const { name, username, description } = routine[0];
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

  return (
    <div className="RoutineView">
      <div className="container col-md-8 offset-md-2">
        <div className="text-center mb-4">
          <h1>{name}</h1>
          <small>Created by {username}</small>
        </div>
        <p>{description}</p>

        {routine.map((data) => (
          <div className="card my-3" key={data.dayofweek}>
            <div className="card-body">
              <h4 className="card-title">Day {data.dayofweek}</h4>
              <RoutineExerciseList exercises={data.exercises} />
            </div>
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
   return (
    <p className="RoutineExercise card-text m-0" key={name}>
      {name}: {sets} sets of {reps} reps
    </p>
  );
 */

/**
 [
    {
        "id": 1,
        "name": "Get big",
        "username": "testuser",
        "description": "Be sure to have nice and controlled reps.",
        "dayofweek": 1,
        "exercises": [
            {
                "exerciseName": "Barbell Curl",
                "sets": "3",
                "reps": "10"
            },
            {
                "exerciseName": "Calf Press",
                "sets": "3",
                "reps": "10"
            }
        ]
    },
    {
        "id": 1,
        "name": "Get big",
        "username": "testuser",
        "description": "Be sure to have nice and controlled reps.",
        "dayofweek": 2,
        "exercises": [
            {
                "exerciseName": "Lat Pulldown",
                "sets": "3",
                "reps": "10"
            },
            {
                "exerciseName": "Barbell Bench Press",
                "sets": "3",
                "reps": "10"
            }
        ]
    },
    {
        "id": 1,
        "name": "Get big",
        "username": "testuser",
        "description": "Be sure to have nice and controlled reps.",
        "dayofweek": 3,
        "exercises": [
            {
                "exerciseName": "Deadlift",
                "sets": "3",
                "reps": "10"
            },
            {
                "exerciseName": "Calf Press",
                "sets": "3",
                "reps": "10"
            }
        ]
    },
    {
        "id": 1,
        "name": "Get big",
        "username": "testuser",
        "description": "Be sure to have nice and controlled reps.",
        "dayofweek": 4,
        "exercises": [
            {
                "exerciseName": "Pull-Up",
                "sets": "2",
                "reps": "15"
            },
            {
                "exerciseName": "Bent-Over Barbell Row",
                "sets": "2",
                "reps": "15"
            }
        ]
    }
]
 */
