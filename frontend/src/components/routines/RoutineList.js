import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FitnessJourney from "../../api";
import SearchForm from "../common/SearchForm";
import LoadingPage from "../common/LoadingPage";
import RoutineCard from "./RoutineCard";

const RoutineList = () => {
  const [routines, setRoutines] = useState(null);

  /** Allows use of async search function */
  useEffect(function getRoutinesOnMount() {
    search();
  }, []);

  const search = async (name) => {
    let routines = await FitnessJourney.getRoutines(name);

    setRoutines(routines);
  };

  /** If no routines, return Loading component */
  if (!routines) return <LoadingPage />;
  /** If no routines and there are 0 routines in state */
  if (!routines && routines.length === 0) {
    return <h3 className="text-center">No routines present.</h3>;
  }

  return (
    <div className="RoutineList col-md-8 offset-md-2">
      <div className="container">
        <h1>Routines</h1>
        <SearchForm searchFor={search} />
        <Link to="/routines/new">
          <button className="btn btn-secondary container mb-3">
            New Routine
          </button>
        </Link>
        {routines.length ? (
          <div className="RoutineList-list">
            {routines.map((routine) => (
              <RoutineCard
                key={routine.id}
                id={routine.id}
                name={routine.name}
                username={routine.username}
              />
            ))}
          </div>
        ) : (
          <h3 className="lead">No routines found.</h3>
        )}
      </div>
    </div>
  );
};

export default RoutineList;
