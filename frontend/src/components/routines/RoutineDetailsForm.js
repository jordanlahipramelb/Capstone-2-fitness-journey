import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
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
    <div className="RoutineDetailsForm mb-4">
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
                required
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                className="form-control mb-2"
                placeholder="What is the name of your routine?"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                id="description"
                name="description"
                label="Description"
                placeholder="What is the decription of your routine?"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary container mt-2">
              Save
            </button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default RoutineDetailsForm;
