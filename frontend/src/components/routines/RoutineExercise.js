import React from "react";
import "./RoutineExercise.css";

/** Renders single exercise
 *

 */

const RoutineExercise = ({ name, sets, reps }) => {
  return (
    <p className="RoutineExercise card-text m-0" key={name}>
      {name}: {sets} sets of {reps} reps
    </p>
  );
};

export default RoutineExercise;
