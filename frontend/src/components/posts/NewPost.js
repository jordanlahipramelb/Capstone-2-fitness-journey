import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import PostForm from "./PostForm";
import FitnessJourney from "../../api";
import UserContext from "../auth/UserContext";

import "./PostForm.css";

/** A simple component that renders the PostForm */

const NewPost = () => {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const username = currentUser.username;
  let date = new Date();

  const [post, setPost] = useState({
    username: username,
    subject: "",
    body: "",
    date: `${date}`,
  });

  /** Add Post */

  const addPost = async (post) => {
    let res = await FitnessJourney.addPost(post);
    setPost(res);

    history.push(`/forum`);
  };

  /** Cancel post and redirect to forum */

  const cancel = () => history.push("/forum");

  return (
    <div className="NewPostForm">
      <div className="container">
        <PostForm post={post} save={addPost} cancel={cancel} />
      </div>
    </div>
  );
};

export default NewPost;
