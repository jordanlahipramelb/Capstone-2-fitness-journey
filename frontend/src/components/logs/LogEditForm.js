import React, { useState } from "react";
import "./LogForm.css";

const LogEditForm = ({ log, updateLog, cancel }) => {
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

    updateLog(formData);
  };

  return (
    <div className="LogEditForm mb-4">
      <div className="col-md-8 offset-md-2">
        <div className="log-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="date">Date of log: </label>
              <input
                className="form-control"
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                name="date"
                required
              />
              <small>
                <p className="text-muted mb-0 mt-2 px-2">
                  Select a date above.
                </p>
                <p className="text-muted mb-3 px-2">
                  Once created, open your created log and add your entries.
                </p>
              </small>
            </div>

            <button type="submit" className="btn btn-primary container mt-2">
              Update
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

export default LogEditForm;
