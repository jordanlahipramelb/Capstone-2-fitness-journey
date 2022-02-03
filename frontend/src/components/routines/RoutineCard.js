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
    <div className="RoutineCard">
      <section className="routine">
        <Link
          to={`/routines/${id}`}
          key={id}
          style={{ textDecoration: "none" }}
        >
          <h2 className="routine-name">{name}</h2>
        </Link>
        <div class="routine-meta">
          <ul>
            <li class="d-flex align-items-center">
              <i class="far fa-user"></i>
              {username}
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default RoutineCard;
