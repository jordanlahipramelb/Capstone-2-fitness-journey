import React, { useState } from "react";

/** Routine Edit Form Component
 *
 * Can be utilized to edit/add data.
 */

const RoutineForm = ({ save, routine, cancel }) => {
  const [formData, setFormData] = useState({
    name: routine[0].name,
    description: routine[0].description,
    dayofweek: routine.map((data) => data.dayofweek),
    exercises: routine.map((data) => data.exercises),
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // save(formData);
  };

  console.log(formData);
  console.log(routine);
  return (
    <div className="RoutineForm">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="subject">Name: </label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Description: </label>
          <textarea
            onChange={handleChange}
            id="description"
            name="description"
            className="form-control"
            rows={5}
            value={formData.description}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary container mt-2">
          Submit
        </button>
        <button onClick={cancel} className="btn btn-secondary container mt-1">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default RoutineForm;

/**
         {formData.map((data) => (
          <div className="card my-3" key={data.dayofweek}>
            <div className="card-body">
              <h4 className="card-title">Day {data.dayofweek}</h4>

              {data.exercises.map((exercise) => (
                <p
                  className="RoutineExercise card-text m-0"
                  key={exercise.exerciseName}
                >
                  {exercise.exerciseName}: {exercise.sets} sets of
                  {exercise.reps} reps
                </p>
              ))}
            </div>
          </div>
        ))}
 */
