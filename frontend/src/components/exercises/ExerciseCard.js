import React from "react";
import { Link } from "react-router-dom";
import "./ExerciseCard.css";

/** Card component showing snapshot information about an exercise.
 *
 * Child of ExerciseList
 *
 * ExerciseList -> ExerciseCard
 */

const ExerciseCard = ({ id, name, description }) => {
  return (
    <Link className="ExerciseCard card" to={`/exercises/${id}`} key={id}>
      <div className="card-body">
        <h6 className="card-title">{name}</h6>
      </div>
    </Link>
  );
};

export default ExerciseCard;
