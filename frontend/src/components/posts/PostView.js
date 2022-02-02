import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
    <div className="PostView">
      <div className="container">
        <section id="breadcrumb">
          <nav aria-label="breadcrumb">
            <div class="d-flex justify-content-between align-items-center">
              <h2>{subject}</h2>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    Home
                  </Link>
                </li>
                <li class="breadcrumb-item">
                  <Link to="/forum" style={{ textDecoration: "none" }}>
                    Forum
                  </Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Post
                </li>
              </ol>
            </div>
          </nav>
        </section>

        <section className="post">
          <div className="entry">
            <div class="entry-meta">
              <ul>
                <li class="d-flex align-items-center">
                  <i class="far fa-user"></i>
                  {username}
                </li>
                <li class="d-flex align-items-center">
                  <i class="far fa-clock"></i>
                  {date}
                </li>
              </ul>
              <div className="PostView-right">
                {sameUser ? userEditBtns() : null}
              </div>
            </div>
            <div class="entry-content">
              <p>{body}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostView;
