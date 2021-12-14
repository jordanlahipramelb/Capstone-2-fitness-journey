import React from "react";
import Comment from "./Comment";

/** Renders list of comments
 *
 * Comments are passed down from props.
 * Renders Comment components.
 *
 * deleteComment function passed down from Post component
 */

const CommentList = ({ comments = [], deleteComment }) => {
  return (
    <div className="CommentList container">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          username={comment.username}
          body={comment.body}
          date={comment.date}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};

export default CommentList;
