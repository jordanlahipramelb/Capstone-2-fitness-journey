import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import FitnessJourney from "../../api";
import LoadingPage from "../common/LoadingPage";

const RoutineExerciseForm = ({ routine }) => {
  const [exercises, setExercises] = useState(null);
  const [formData, setFormData] = useState({
    username: routine[0].username,
    name: routine[0].name,
    description: routine[0].description,
  });

  const [inputList, setInputList] = useState([
    {
      routine_id: `${routine[0].id}`,
      exercise_id: "",
      dayofweek: "",
      sets: "",
      reps: "",
    },
  ]);

  useEffect(function getExercisesOnMount() {
    async function getExercises() {
      setExercises(await FitnessJourney.getExercises());
    }

    getExercises();
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((d) => ({
      ...d,
      [name]: value,
    }));
  };

  // handle input change
  const handleInputChange = (evt, index) => {
    const { name, value } = evt.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        routine_id: `${routine[0].id}`,
        exercise_id: "",
        dayofweek: "",
        sets: "",
        reps: "",
      },
    ]);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  if (!exercises) return <LoadingPage />;

  return (
    <div className="RoutineExerciseForm">
      <div className="container">
        <h1>Add Exercises</h1>
        <div className="form-group">
          <label htmlFor="name">Routine Name: </label>
          <input
            className="form-control"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Description: </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {inputList.map((x, i) => (
          <div className="m-3">
            <div className="card p-2">
              <div className="row">
                <div className="col">
                  <select
                    className="form-control form-control-sm"
                    name="dayofweek"
                    value={x.dayofweek}
                    onChange={(evt) => handleInputChange(evt, i)}
                    required
                  >
                    <option value="" disabled selected hidden>
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
                    value={x.sets}
                    onChange={(evt) => handleInputChange(evt, i)}
                    required
                  >
                    <option value="" disabled selected hidden>
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
                    value={x.reps}
                    onChange={(evt) => handleInputChange(evt, i)}
                    required
                  >
                    <option value="" disabled selected hidden>
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
              <div className="my-2">
                <select
                  className="form-control form-control-sm"
                  name="exercise_id"
                  value={x.exercise_id}
                  onChange={(evt) => handleInputChange(evt, i)}
                  required
                >
                  <option value="" disabled selected hidden>
                    Select Exercise
                  </option>
                  {exercises.map((exercise) => (
                    <option value={exercise.id} key={exercise.id}>
                      {exercise.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="btn-box">
              {inputList.length !== 1 && (
                <button
                  className="btn btn-danger my-1"
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button
                  className="btn btn-primary m-2"
                  onClick={handleAddClick}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        ))}
        <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
      </div>
    </div>
  );
};

export default RoutineExerciseForm;
