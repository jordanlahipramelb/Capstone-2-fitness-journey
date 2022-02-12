import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
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
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Name"
                className="form-control mb-2"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <TextField
                id="description"
                name="description"
                label="Description"
                placeholder="Placeholder"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary container mt-2">
              Create
            </button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default RoutineForm;
