import React from "react";
import "./RoutineExercise.css";

/** Renders single exercise
 *

 */

const RoutineExercise = ({ name, sets, reps }) => {
  return (
    <div className="RoutineExercise" key={name}>
      <h6>{name}:</h6>
      <p>
        {sets} sets of {reps} reps
      </p>
    </div>
  );
};

export default RoutineExercise;
