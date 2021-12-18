import React, { useState, useContext } from "react";
import FitnessJourney from "../../api";
import UserContext from "../auth/UserContext";

/** Renders Comment Form
 *
 * Used for adding/editing a comment.
 */

const CommentForm = ({ postId, addComment }) => {
  const { currentUser } = useContext(UserContext);
  const username = currentUser.username;
  let date = new Date();
  let initialState = {
    username: username,
    body: "",
    date: `${date}`,
    post_id: parseInt(postId),
  };
  const [comment, setComment] = useState(initialState);

  console.log(comment);

  /** Allows form to be used */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setComment((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    addComment(comment);

    setComment(initialState);
  };

  return (
    <div className="CommentForm">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="body"
            size="40"
            placeholder="New Comment"
            className="form-control"
            value={comment.body}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
