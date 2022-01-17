import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import Homepage from "../components/home/Homepage";
import PostList from "../components/posts/PostList";
import Post from "../components/posts/Post";
import NewPost from "../components/posts/NewPost";
import ExerciseList from "../components/exercises/ExerciseList";
import ExerciseDetails from "../components/exercises/ExerciseDetails";
import Profile from "../components/users/Profile";

import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ProfileForm from "../components/users/ProfileForm";
import RoutineList from "../components/routines/RoutineList";
import Routine from "../components/routines/Routine";
import NewRoutine from "../components/routines/NewRoutine";
import RoutineExerciseForm from "../components/routines/RoutineExerciseForm";

const Routes = ({ login, register }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>

      <Route exact path="/login">
        <LoginForm login={login} />
      </Route>

      <Route exact path="/register">
        <RegisterForm register={register} />
      </Route>

      <Route exact path="/exercises">
        <ExerciseList />
      </Route>

      <Route exact path="/exercises/:id">
        <ExerciseDetails />
      </Route>

      <Route exact path="/routines/new">
        <NewRoutine />
      </Route>

      <Route exact path="/routines/add-exercises">
        <RoutineExerciseForm />
      </Route>

      <Route exact path="/routines">
        <RoutineList />
      </Route>

      <Route exact path="/routines/:routineId">
        <Routine />
      </Route>

      <Route exact path="/forum/new">
        <NewPost />
      </Route>

      <Route exact path="/forum">
        <PostList />
      </Route>

      <Route exact path="/forum/:postId">
        <Post />
      </Route>

      <Route exact path="/athlete">
        <Profile />
      </Route>

      <ProtectedRoutes exact path="/athlete/edit">
        <ProfileForm />
      </ProtectedRoutes>

      <Route exact path="/athletes/:username"></Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
