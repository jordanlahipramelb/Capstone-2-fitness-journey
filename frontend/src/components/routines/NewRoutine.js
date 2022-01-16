import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import FitnessJourney from "../../api";
import UserContext from "../auth/UserContext";
import RoutineForm from "./RoutineForm";

const NewRoutine = () => {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const username = currentUser.username;
  const [routine, setRoutine] = useState({
    username: username,
    name: "",
    description: "",
  });

  /** Add Routine */

  const addRoutine = async (routine) => {
    let res = await FitnessJourney.addRoutine(routine);

    setRoutine(res);
    history.push(`/routines`);
  };

  /** Cancel routine creation and redirect to routines */

  const cancel = () => history.push("/routines");

  return (
    <div className="NewRoutineForm">
      <div className="container">
        <h1>New Routine</h1>
        <RoutineForm
          routine={routine}
          addRoutine={addRoutine}
          cancelRoutine={cancel}
        />
      </div>
    </div>
  );
};

export default NewRoutine;
