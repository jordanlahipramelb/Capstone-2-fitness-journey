import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FitnessJourney from "../../api";
import LoadingPage from "../common/LoadingPage";
import "./RoutineExerciseAddDeleteForm.css";

const RoutineExerciseAddDeleteForm = ({
  handleAddSubmit,
  handleDeleteSubmit,
  formData,
  handleInputChange,
  routineExercises,
}) => {
  const [allExercises, setAllExercises] = useState(null);

  useEffect(function getAllExercisesOnMount() {
    async function getExercises() {
      setAllExercises(await FitnessJourney.getExercises());
    }

    getExercises();
  }, []);

  if (!allExercises) return <LoadingPage />;

  console.log(formData);
  return (
    <div className="RoutineExerciseAddDeleteForm mb-5">
      <div className="row">
        <div className="col-sm-6 col-md-6">
          <div className="add-delete-form">
            <form onSubmit={handleAddSubmit}>
              <div className="card-body p-2">
                <h4 className="card-title text-center">Add Exercise</h4>
                <div className="row">
                  <div className="col">
                    <select
                      className="form-control form-control-sm"
                      name="dayOfWeek"
                      value={formData.dayOfWeek}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled hidden>
                        Select Day
                      </option>
                      <option value="1">Day 1</option>
                      <option value="2">Day 2</option>
                      <option value="3">Day 3</option>
                      <option value="4">Day 4</option>
                      <option value="5">Day 5</option>
                      <option value="6">Day 6</option>
                      <option value="7">Day 7</option>
                    </select>
                  </div>
                  <div className="col">
                    <select
                      className="form-control form-control-sm"
                      name="sets"
                      value={formData.sets}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled hidden>
                        Select Number of Sets
                      </option>
                      {[...Array(51)].map((evt, i) => (
                        <option value={i} key={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col">
                    <select
                      className="form-control form-control-sm"
                      name="reps"
                      value={formData.reps}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled hidden>
                        Select Number of Reps
                      </option>
                      {[...Array(51)].map((evt, i) => (
                        <option value={i} key={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="my-2">
                    <select
                      className="form-control form-control-sm"
                      name="exercise_id"
                      value={formData.exercise_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled hidden>
                        Select Exercise
                      </option>
                      {allExercises.map((exercise) => (
                        <option value={exercise.id} key={exercise.id}>
                          {exercise.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary container mt-2"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="add-delete-form">
            <form onSubmit={handleDeleteSubmit}>
              <div className="card-body p-2">
                <h4 className="card-title text-center">Delete Exercise</h4>
                <div className="my-2">
                  <select
                    className="form-control form-control-sm"
                    name="routines_exercises_id"
                    value={formData.routines_exercises_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled hidden>
                      Which exercise do you want to remove?
                    </option>
                    {routineExercises.map((e) => (
                      <option value={e.id} key={e.id}>
                        Day {e.dayofweek}: {e.name} {e.sets} sets of {e.reps}{" "}
                        reps
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-danger container mt-2">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineExerciseAddDeleteForm;
