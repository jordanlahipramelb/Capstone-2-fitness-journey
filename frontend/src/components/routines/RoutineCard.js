import React from "react";
import { Link } from "react-router-dom";
import "./RoutineCard.css";

/** Card component showing snapshot information about a routine.
 *
 * Child component of RoutineList
 *
 * RoutineList -> RoutineCard
 */

const RoutineCard = ({ id, name, username }) => {
  return (
    <Link className="RoutineCard card" to={`/routines/${id}`} key={id}>
      <div className="card-body">
        <h6 className="card-title">{name}</h6>
        <p>
          <small>Created by: {username}</small>
        </p>
      </div>
    </Link>
  );
};

export default RoutineCard;
