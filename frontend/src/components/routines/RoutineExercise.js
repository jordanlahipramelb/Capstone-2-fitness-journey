import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RoutineExerciseAddDeleteForm from "./RoutineExerciseAddDeleteForm";
import RoutineDetailsForm from "./RoutineDetailsForm";

const RoutineExercise = ({
  routine,
  routineExercises,
  addExercise,
  deleteExercise,
  updateRoutine,
}) => {
  const { routineId } = useParams();

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [formData, setFormData] = useState({
    routine_id: routineId,
    exercise_id: "",
    dayOfWeek: "",
    sets: "",
    reps: "",
    routines_exercises_id: "",
  });

  /** Toggles between details form and exercise form */

  const toggleEdit = () => {
    setIsEditingDetails((editing) => !editing);
  };

  /** Handles input change */

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleAddSubmit = (evt) => {
    evt.preventDefault();

    addExercise(formData);
  };

  const handleDeleteSubmit = (evt) => {
    evt.preventDefault();

    deleteExercise(formData.routines_exercises_id);
  };

  const cancelEdit = () => {
    window.location.reload(true);
  };

  return (
    <div className="RoutineExercise">
      <div className="container">
        <h1 className="text-center">Editing {routine[0].name}</h1>
        <div className="text-center">
          {isEditingDetails ? (
            <button className="btn btn-primary btn-small" onClick={toggleEdit}>
              Edit Details?
            </button>
          ) : (
            <button className="btn btn-primary btn-small" onClick={toggleEdit}>
              Add/Delete exercises?
            </button>
          )}
          <button
            className="btn btn-secondary btn-small m-1"
            onClick={cancelEdit}
          >
            Go Back
          </button>
        </div>

        {isEditingDetails ? (
          <RoutineExerciseAddDeleteForm
            routineExercises={routineExercises}
            handleAddSubmit={handleAddSubmit}
            handleDeleteSubmit={handleDeleteSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        ) : (
          <RoutineDetailsForm routine={routine} updateRoutine={updateRoutine} />
        )}
      </div>
    </div>
  );
};

export default RoutineExercise;
