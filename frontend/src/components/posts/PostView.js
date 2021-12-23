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
  const { username, subject, body, date } = post;
  const { currentUser } = useContext(UserContext);
  let sameUser;

  if (currentUser.username === username) {
    sameUser = true;
  } else {
    sameUser = false;
  }
  const userEditBtns = () => {
    return (
      <div className="PostView-editArea">
        <i className="fas fa-edit text-primary icon" onClick={toggleEdit} />
        <i className="fas fa-times text-danger icon" onClick={deletePost} />
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
        <div>{date}</div>
      </div>
      <div className="PostView-right">{sameUser ? userEditBtns() : null}</div>
    </div>
  );
};

export default PostView;
