import React from "react";
import RoutineExercise from "./RoutineExercise";

/** Renders list of exercises in routine
 *
 * Exercises are passed down from props.
 * Renders RoutineExercise components.
 *
 * deleteExercise function passed down from Routine component
 */

const RoutineExerciseList = ({ exercises = [] }) => {
  return (
    <div className="RoutineExerciseList">
      <div className="container">
        {exercises.map((exercise) => (
          <RoutineExercise
            key={exercise.exerciseName}
            name={exercise.exerciseName}
            sets={exercise.sets}
            reps={exercise.reps}
          />
        ))}
      </div>
    </div>
  );
};

/**
   return (
    <p className="RoutineExercise card-text m-0" key={name}>
      {name}: {sets} sets of {reps} reps
    </p>
  );
 */

export default RoutineExerciseList;
