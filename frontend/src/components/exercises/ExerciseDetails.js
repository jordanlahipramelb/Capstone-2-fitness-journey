import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FitnessJourney from "../../api";
import LoadingPage from "../common/LoadingPage";

/** Component that renders details of a single exercise.
 * /exercises/:id
 *
 * Consists of an exercise's:
 * - Name
 * - Description
 * - Image
 * - Instructions
 */

const ExerciseDetails = () => {
  /** Retrieve id of exercise from handle */
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);

  useEffect(
    function getExerciseOnMount() {
      async function getExercise() {
        setExercise(await FitnessJourney.getExercise(id));
      }

      getExercise();
    },
    [id]
  );

  if (!exercise) return <LoadingPage />;

  console.log(exercise.imageUrl);

  console.log(exercise);
  return (
    <div className="ExerciseDetails col-md-8 offset-md-2">
      <div className="container">
        <h1>{exercise.name}</h1>
        <p>{exercise.description}</p>
        <div>
          <h5>Equipment Type</h5>
          <ul>
            <li>{exercise.equipmentType}</li>
          </ul>
        </div>
        <div>
          <h5>Muscles Worked</h5>
          <ul>
            <li>Primary: {exercise.primaryMuscle}</li>
            {exercise.secondaryMuscle === null ? null : (
              <li>Secondary: {exercise.secondaryMuscle}</li>
            )}
          </ul>
        </div>
        <div>
          <img src={exercise.imageUrl} alt={`${exercise.name}`} />
        </div>
        <h5>Instructions</h5>
        <p>{exercise.instructions}</p>
      </div>
    </div>
  );
};

export default ExerciseDetails;
