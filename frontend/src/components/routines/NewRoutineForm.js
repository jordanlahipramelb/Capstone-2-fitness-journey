import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import FitnessJourney from "../../api";
import UserContext from "../auth/UserContext";

const NewRoutineForm = () => {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const username = currentUser.username;
  const [routine, setRoutine] = useState({
    username: username,
    name: "",
    description: "",
  });
  const [day1, setDay1] = useState(null);
  const [day2, setDay2] = useState(null);
  const [day3, setDay3] = useState(null);
  const [day4, setDay4] = useState(null);
  const [day5, setDay5] = useState(null);
  const [day6, setDay6] = useState(null);
  const [day7, setDay7] = useState(null);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRoutine((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  return (
    <div className="NewRoutineForm">
      <div className="container">
        <h1>New Routine</h1>
        <div className="form-group">
          <label htmlFor="name">Routine Name: </label>
          <input className="form-control" id="name" name="name" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="body">Description: </label>
          <textarea
            onChange={handleChange}
            id="body"
            name="body"
            className="form-control"
            rows={10}
            value={routine.description}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default NewRoutineForm;
