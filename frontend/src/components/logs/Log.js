import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import FitnessJourney from "../../api";
import LoadingPage from "../common/LoadingPage";
import LogView from "./LogView";

/** Main Log Component
 *
 * Receives log data from state.
 *
 * Decides, from its own state, whether to show the edit form or the simple LogView component.
 * This also handles editing and deleting a log.
 *
 *
 * Parent for
 * - LogForm
 * - LogView
 */

const Log = () => {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const username = currentUser.username;
  const { logId } = useParams();
  const [log, setLog] = useState(null);
  const [logEntries, setLogEntries] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  /** Request log from API via logId */

  useEffect(
    function getLogOnMount() {
      async function getLog() {
        let log = await FitnessJourney.getLog(logId);

        setLog(log);
      }

      getLog();
    },
    // rerun when log id changes
    [logId]
  );

  useEffect(
    function getLogEntriesOnMount() {
      async function getLogEntries() {
        setLogEntries(await FitnessJourney.getLogEntries(logId));
      }

      getLogEntries();
    },
    [logId]
  );

  if (!(log || logEntries)) return <LoadingPage />;

  /** Toggles editing routine on/off */

  const toggleEdit = () => {
    setIsEditing((editing) => !editing);
  };

  /** Handles deleting a log */

  const deleteLog = async () => {
    await FitnessJourney.deleteLog(logId);

    history.push(`/logs`);
  };

  /** Adds log entry to log */

  const addLogEntryToLog = async (logEntry) => {
    await FitnessJourney.addLogEntry(logEntry);

    window.location.reload(true);
  };

  /** Deletes log entry from log */

  const deleteLogEntryFromLog = async (id) => {
    await FitnessJourney.deleteLogEntry(id);

    window.location.reload(true);
  };
  console.log(log[0]);

  return (
    <div className="Log py-4">
      <div className="container">
        {/* Decide whether to show the edit form if toggleEdit is true, or the simple RoutineView component */}
        <LogView log={log[0]} deleteLog={deleteLog} toggleEdit={toggleEdit} />
      </div>
    </div>
  );
};

export default Log;
