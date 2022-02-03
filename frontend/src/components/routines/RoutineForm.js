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
    <div className="RoutineForm mb-5">
      <div className="container">
        <section id="breadcrumb">
          <nav aria-label="breadcrumb">
            <div class="d-flex justify-content-between align-items-center">
              <h2></h2>
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
                  Routine
                </li>
              </ol>
            </div>
          </nav>
        </section>
      </div>
      <div className="routine-form">
        <form onSubmit={handleSubmit} className="mb-4">
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
  );
};

export default RoutineForm;
