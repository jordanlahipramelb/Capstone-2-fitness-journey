import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RoutineForm.css";

const RoutineForm = ({ routine, addRoutine, cancelRoutine }) => {
  const [formData, setFormData] = useState({
    username: routine.username,
    name: routine.name,
    description: routine.description,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((d) => ({
      ...d,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    addRoutine(formData);
  };

  return (
    <div className="RoutineForm mb-4">
      <div className="col-md-8 offset-md-2">
        <div className="routine-form">
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary container mt-2">
              Save
            </button>
            <button
              onClick={cancelRoutine}
              className="btn btn-secondary container mt-1"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoutineForm;
