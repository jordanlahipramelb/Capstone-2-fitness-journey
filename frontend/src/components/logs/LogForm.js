import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LogForm.css";

const LogForm = ({ log, addLog, cancel }) => {
  const [formData, setFormData] = useState({
    date: log.date,
    username: log.username,
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

    addLog(formData);
  };

  return (
    <div className="LogForm mb-4">
      <div className="col-md-8 offset-md-2">
        <div className="log-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="date">Date of log: </label>
              <input
                className="form-control"
                id="date"
                date="date"
                type="text"
                value={formData.date}
                onChange={handleChange}
                placeholder="mm/dd/yyyy"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary container mt-2">
              Submit
            </button>
            <button
              onClick={cancel}
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

export default LogForm;
