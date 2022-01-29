import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Routine.css";

import LoadingPage from "../common/LoadingPage";
import RoutineView from "./RoutineView";

import FitnessJourney from "../../api";
import RoutineExercise from "./RoutineExercise";

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
  const [routineExercises, setRoutineExercises] = useState(null);
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

  useEffect(
    function getRoutineExercisesOnMount() {
      async function getRoutineExercises() {
        setRoutineExercises(
          await FitnessJourney.getRoutineExercises(routineId)
        );
      }

      getRoutineExercises();
    },
    [routineId]
  );

  if (!(routine || routineExercises)) return <LoadingPage />;

  /** Toggles editing routine on/off */

  const toggleEdit = () => {
    setIsEditing((editing) => !editing);
  };

  /** Handles editing a routine */

  const editRoutineDetails = async (routine) => {
    await FitnessJourney.updateRoutine(routineId, routine);

    window.location.reload(true);
  };

  /** Handles deleting a routine */

  const deleteRoutine = async () => {
    await FitnessJourney.deleteRoutine(routineId);

    history.push("/routines");
  };

  /** Adds exercise to routine */

  const addExerciseToRoutine = async (exercise) => {
    await FitnessJourney.addExercise(exercise);

    window.location.reload(true);
  };

  /** Deletes exercise from routine */

  const deleteExerciseFromRoutine = async (id) => {
    await FitnessJourney.deleteExercise(id);

    window.location.reload(true);
  };

  return (
    <div className="Routine container">
      {/* Decide whether to show the edit form if toggleEdit is true, or the simple RoutineView component */}
      {isEditing ? (
        <RoutineExercise
          routine={routine}
          routineExercises={routineExercises}
          addExercise={addExerciseToRoutine}
          deleteExercise={deleteExerciseFromRoutine}
          updateRoutine={editRoutineDetails}
        />
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
