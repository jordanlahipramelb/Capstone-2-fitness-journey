import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FitnessJourney from "../../api";
import LoadingPage from "../common/LoadingPage";

const LogEntryForm = ({
  logEntries,
  routinesWithExercises,
  addEntry,
  deleteEntry,
}) => {
  const { logId } = useParams();
  const [formData, setFormData] = useState({
    log_id: logId,
    routine_exercise_id: "",
    set_number: "",
    reps: "",
    weight: "",
    logs_entries_id: "",
  });

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

    addEntry(formData);
  };

  const handleDeleteSubmit = (evt) => {
    evt.preventDefault();

    deleteEntry(formData.logs_entries_id);
  };

  if (!logEntries || !routinesWithExercises) return <LoadingPage />;

  console.log(formData);
  return (
    <div className="LogEntryForm">
      <div className="row">
        <div className="col-sm-6 col-md-6">
          <div className="add-delete-form">
            <form onSubmit={handleAddSubmit}>
              <div className="card-body p-2">
                <h4 className="card-title text-center">Add Entry</h4>
                <div className="row mb-1">
                  <div className="col">
                    <select
                      className="form-control form-control-sm"
                      name="routine_exercise_id"
                      value={formData.routine_exercise_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled hidden>
                        Select Routine & Exercise
                      </option>
                      {routinesWithExercises.map((d) => (
                        <option
                          value={d.routineExerciseId}
                          key={d.routineExerciseId}
                          title={`Goal: ${d.sets} sets of ${d.reps} reps`}
                        >
                          {d.routineName}: Day {d.dayofweek} {d.exerciseName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <select
                      className="form-control form-control-sm"
                      name="set_number"
                      value={formData.set_number}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled hidden>
                        Set Number
                      </option>
                      {[...Array(21)].map((evt, i) => (
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
                        # of Reps
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
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled hidden>
                        Weight
                      </option>
                      {[...Array(1000)].map((evt, i) => (
                        <option value={i} key={i}>
                          {i}
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
                <h4 className="card-title text-center">Delete Entry</h4>
                <div className="my-2">
                  <select
                    className="form-control form-control-sm"
                    name="logs_entries_id"
                    value={formData.logs_entries_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled hidden>
                      Which Entry Do You Want to Remove?
                    </option>
                    {logEntries.map((e) => (
                      <option value={e.id} key={e.id}>
                        {e.name} Set {e.set_number}
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

export default LogEntryForm;
