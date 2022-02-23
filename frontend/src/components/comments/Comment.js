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
    <div className="comment" key={id}>
      <div class="d-flex">
        {sameUser ? userEditBtns() : null}
        <div>
          <p>{username}</p>
          <div className="d-flex align-items-center icon">
            <i className="far fa-clock"></i>
            <time>{date}</time>
          </div>
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
