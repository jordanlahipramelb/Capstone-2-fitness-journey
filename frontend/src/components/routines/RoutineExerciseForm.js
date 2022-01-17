import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import FitnessJourney from "../../api";

const RoutineExerciseForm = ({ routine }) => {
  const [exercises, setExercises] = useState(null);
  const [formData, setFormData] = useState({
    username: routine[0].username,
    name: routine[0].name,
    description: routine[0].description,
  });

  useEffect(function getExercisesOnMount() {
    async function getExercises() {
      setExercises(await FitnessJourney.getExercises());
    }

    getExercises();
  });

  return (
    <div className="RoutineExerciseForm">
      <h1>Add Exercises</h1>
    </div>
  );
};

export default RoutineExerciseForm;
