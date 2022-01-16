import React, { useState } from "react";
import { useHistory } from "react-router";

const RoutineForm = ({ routine, addRoutine, cancelRoutine }) => {
  const history = useHistory();
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
    <div className="NewRoutineForm">
      <div className="card  mb-5">
        <div className="card-body">
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
                rows={5}
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
