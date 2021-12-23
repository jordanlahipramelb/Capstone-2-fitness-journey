import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import "./Comment.css";

/** Renders single comment
 *
 * Can be deleted via id with function passed down
 * from main parent Post -> CommentList -> Comment.
 * Displays text.
 */

const Comment = ({ id, username, body, date, deleteComment }) => {
  const { currentUser } = useContext(UserContext);

  let sameUser;

  if (currentUser.username === username) {
    sameUser = true;
  } else {
    sameUser = false;
  }

  const handleDelete = () => {
    deleteComment(id);
  };

  const userEditBtns = () => {
    return (
      <div className="Comment-editArea">
        {/* <i className="fas fa-edit text-primary" /> */}
        {deleteComment && (
          <i
            className="deleteBtn fa fa-times text-danger mr-2"
            onClick={handleDelete}
          />
        )}
      </div>
    );
  };

  return (
    <div className="Comment" key={id}>
      <h6>{username}:</h6>
      <p>{body}</p>
      <p>{date}</p>
      <div className="Comment-right">{sameUser ? userEditBtns() : null}</div>
    </div>
  );
};

export default Comment;
