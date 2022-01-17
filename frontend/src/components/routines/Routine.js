import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Routine.css";

import LoadingPage from "../common/LoadingPage";
import RoutineView from "./RoutineView";

import FitnessJourney from "../../api";
import RoutineExerciseForm from "./RoutineExerciseForm";

/** Main Routine Component
 *
 * Receives routine data from state.
 *
 * Decides, from its own state, whether to show the edit form or the simple RoutineView component.
 * This also handles editing and deleting the routine.
 *
 *
 * Parent for
 * - RoutineForm
 * - RoutineView
 */

const Routine = () => {
  const history = useHistory();
  const { routineId } = useParams();
  const [routine, setRoutine] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  /** Request routine from API via routineId */

  useEffect(
    function getRoutineOnMount() {
      async function getRoutine() {
        let routine = await FitnessJourney.getRoutine(routineId);
        // set routine state to the handle
        setRoutine(routine);
      }

      getRoutine();
    },
    // rerun when routine id changes
    [routineId]
  );

  if (!routine) return <LoadingPage />;

  /** Toggles editing routine on/off */

  const toggleEdit = () => {
    setIsEditing((editing) => !editing);
  };

  /** Handles editing a routine */

  const editRoutine = async (routine) => {
    await FitnessJourney.updateRoutine(routineId, routine);

    window.location.reload(true);
  };

  /** Handles deleting a routine */

  const deleteRoutine = async () => {
    await FitnessJourney.deleteRoutine(routineId);

    history.push("/routines");
  };

  console.log(routine);
  return (
    <div className="Routine container">
      {/* Decide whether to show the edit form if toggleEdit is true, or the simple RoutineView component */}
      {isEditing ? (
        <RoutineExerciseForm routine={routine} />
      ) : (
        <RoutineView
          routine={routine}
          deleteRoutine={deleteRoutine}
          toggleEdit={toggleEdit}
        />
      )}
    </div>
  );
};

export default Routine;
