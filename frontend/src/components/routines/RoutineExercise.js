import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
        <div className="col-md-10 offset-md-1">
          <section id="breadcrumb">
            <nav aria-label="breadcrumb">
              <div class="d-flex justify-content-between align-items-center">
                <h2>{routine[0].name}</h2>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>
                  <li class="breadcrumb-item">
                    <Link to="/forum" style={{ textDecoration: "none" }}>
                      Routines
                    </Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Editing
                  </li>
                </ol>
              </div>
            </nav>
          </section>
        </div>

        <div className="text-center">
          {isEditingDetails ? (
            <button
              className="btn btn-secondary btn-small"
              onClick={toggleEdit}
            >
              Edit Details?
            </button>
          ) : (
            <button
              className="btn btn-secondary btn-small"
              onClick={toggleEdit}
            >
              Add/Delete exercises?
            </button>
          )}
          <button
            className="btn btn-danger btn-small mx-1"
            onClick={cancelEdit}
          >
            Cancel
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
