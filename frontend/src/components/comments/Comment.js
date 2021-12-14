import React from "react";
import "./Comment.css";

/** Renders single comment
 *
 * Can be deleted via id with function passed down
 * from main parent Post -> CommentList -> Comment.
 * Displays text.
 */

const Comment = ({ id, username, body, deleteComment }) => {
  // const handleDelete = () => {
  //   deleteComment(id);
  // };

  return (
    <div className="Comment">
      <h6>{username}:</h6>
      <p>{body}</p>
      <div className="Comment-right">
        <i className="fa fa-times text-danger mr-2" />
      </div>
    </div>
  );
};

export default Comment;
