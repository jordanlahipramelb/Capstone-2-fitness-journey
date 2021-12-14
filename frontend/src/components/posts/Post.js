import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import "./Post.css";

import LoadingPage from "../common/LoadingPage";
import PostView from "./PostView";
import PostForm from "./PostForm";
import CommentList from "../comments/CommentList";
import CommentForm from "../comments/CommentForm";
import FitnessJourney from "../../api";
import UserContext from "../auth/UserContext";

/** Main Post Component
 *
 * Received post data from state.
 *
 * Decides, from its own state, whether to show the edit form or the simple PostView component.
 * This also handles editing, deleting, comment-adding, and comment-deleting.
 *
 *
 * Parent for
 * - PostForm
 * - PostView
 * - CommentList -> Comment
 * - CommentForm
 */

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();

  /** Request post from API via postId */

  useEffect(
    function getPostAndCommentsOnMount() {
      async function getPost() {
        let post = await FitnessJourney.getPost(postId);
        // set post state to the handle
        setPost(post);
      }

      getPost();
    },
    // rerun when post id changes
    [postId]
  );

  if (!post) return <LoadingPage />;

  /** Toggles editing post on/off */

  const toggleEdit = () => {
    setIsEditing((editting) => !editting);
  };

  /** Handles deleting a post */

  const deletePost = () => {};

  /** Handles adding a comment */

  /** Handles deleting a comment via comment id */

  return (
    <div className="Post container">
      {/* Decide whether to show the edit form if toggleEdit is true, or the simple PostView component */}
      {isEditing ? (
        <PostForm post={post} cancel={toggleEdit} />
      ) : (
        <PostView post={post} toggleEdit={toggleEdit} />
      )}

      <div className="Post-comments mb-3">
        <h4>Comments</h4>
        <CommentList comments={post.comments} />
        <CommentForm />
      </div>
    </div>
  );
};

export default Post;
