import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RoutineDetailsForm.css";

const RoutineDetailsForm = ({ routine, updateRoutine }) => {
  const [formData, setFormData] = useState({
    username: routine[0].username,
    name: routine[0].name,
    description: routine[0].description,
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

    updateRoutine(formData);
  };

  return (
    <div className="RoutineDetailsForm">
      <div className="routine-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name: </label>
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
        </form>
      </div>
    </div>
  );
};

export default RoutineDetailsForm;
