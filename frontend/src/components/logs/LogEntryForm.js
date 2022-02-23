import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LoadingPage from "../common/LoadingPage";

const LogEntryForm = ({ logEntries, routinesWithExercises, addEntry }) => {
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

  if (!logEntries || !routinesWithExercises) return <LoadingPage />;

  console.log(formData);
  return (
    <div className="LogEntryForm pb-5">
      <div className="row">
        <div className="col-sm-12 col-md-12">
          <div className="add-delete-form">
            <form onSubmit={handleAddSubmit}>
              <div className="card-body p-2">
                <h4 className="card-title text-center">Add Entry</h4>
                <div className="row mb-2">
                  <div className="col">
                    <FormControl fullWidth>
                      <InputLabel id="routine_exercise_id">
                        Routine/Exercise
                      </InputLabel>
                      <Select
                        className="form-control form-control-sm"
                        name="routine_exercise_id"
                        labelId="routine_exercise_id"
                        label="Routine/Exercise"
                        value={formData.routine_exercise_id}
                        onChange={handleInputChange}
                        required
                      >
                        {routinesWithExercises.map((d) => (
                          <MenuItem
                            value={d.routineExerciseId}
                            key={d.routineExerciseId}
                            title={`Goal: ${d.sets} sets of ${d.reps} reps`}
                          >
                            {d.routineName}: Day {d.dayofweek} {d.exerciseName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <FormControl fullWidth>
                      <InputLabel id="set_number">Set #</InputLabel>
                      <Select
                        className=""
                        label="Set #"
                        name="set_number"
                        labelId="set_number"
                        value={formData.set_number}
                        onChange={handleInputChange}
                        required
                      >
                        {[...Array(21)].map((evt, i) => (
                          <MenuItem value={i} key={i}>
                            {i}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col">
                    <FormControl fullWidth>
                      <InputLabel id="reps"># of Reps</InputLabel>
                      <Select
                        className=""
                        label="# of Reps"
                        labelId="reps"
                        name="reps"
                        value={formData.reps}
                        onChange={handleInputChange}
                        required
                      >
                        {[...Array(51)].map((evt, i) => (
                          <MenuItem value={i} key={i}>
                            {i}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col">
                    <FormControl fullWidth>
                      <InputLabel id="weight">Weight</InputLabel>
                      <Select
                        className=""
                        label="weight"
                        labelId="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        required
                      >
                        {[...Array(500)].map((evt, i) => (
                          <MenuItem value={i} key={i}>
                            {i}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
      </div>
    </div>
  );
};

export default LogEntryForm;
