import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import "./PostView.css";

/** Render a Single Post
 *
 *
 * - show edit/delete buttons (& call parent on action)
 *
 */

const PostView = ({ post, toggleEdit, deletePost }) => {
  const { username, subject, body } = post;
  const { currentUser } = useContext(UserContext);
  let sameUser;

  console.log(currentUser);

  if (currentUser.username === username) {
    sameUser = true;
  } else {
    sameUser = false;
  }

  const userEditBtns = () => {
    return (
      <div className="PostView-editArea">
        <i className="fas fa-edit text-primary" onClick={toggleEdit} />
        <i className="fas fa-times text-danger" />
      </div>
    );
  };

  return (
    <div className="PostView container">
      <div>
        <h2>{subject}</h2>
        <p>
          <i>{username}</i>
        </p>
        <div>{body}</div>
      </div>
      <div className="PostView-right">{sameUser ? userEditBtns() : null}</div>
    </div>
  );
};

export default PostView;
