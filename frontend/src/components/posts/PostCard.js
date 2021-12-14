import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";

/** Card component showing snapshot information about a post.
 *
 * Child component of PostList
 *
 * PostList -> PostCard
 */

const PostCard = ({ id, username, subject, date }) => {
  return (
    <Link className="PostCard card" to={`/forum/${id}`} key={id}>
      <div className="card-body">
        <h6 className="card-title">{subject}</h6>
        <p>
          <small>{username}</small>
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
