import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import NewPost from "./components/NewPost";
import Post from "./components/Post";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>

      <Route exact path="/new">
        <NewPost />
      </Route>
      <Route exact path="/:postId">
        <Post />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
