import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FitnessJourney from "../../api";
import LoadingPage from "../common/LoadingPage";
import RoutineExerciseAddDeleteForm from "./RoutineExerciseAddDeleteForm";

const RoutineExercise = ({
  routine,
  routineExercises,
  addExercise,
  deleteExercise,
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

  return (
    <div className="RoutineExerciseForm">
      <div className="container">
        <h1 className="text-center">Editing {routine[0].name}</h1>

        <RoutineExerciseAddDeleteForm
          routineExercises={routineExercises}
          handleAddSubmit={handleAddSubmit}
          deleteExercise={deleteExercise}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default RoutineExercise;
