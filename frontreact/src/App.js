import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import React, { Suspense } from "react";

import NavigationBar from "./components/NavigationBar";

import { getUserAsync } from "./redux/auth/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SpinnerComp from "./components/Spinner";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const Login = React.lazy(() => import("./pages/Login"));
const SinglePost = React.lazy(() => import("./pages/SinglePost"));
const Signup = React.lazy(() => import("./pages/Signup"));
const CreatePost = React.lazy(() => import("./pages/CreateBlog"));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAsync());
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <NavigationBar />
      <Switch>
        <Suspense fallback={<SpinnerComp />}>
          <Route component={HomePage} path="/" exact />
          <Route component={Login} path="/login" />
          <Route component={Signup} path="/signup" />
          <Route component={ProfilePage} path="/profile" />
          <Route component={CreatePost} path="/create" />
          <Route component={SinglePost} path="/posts/:slug" />
        </Suspense>
      </Switch>
    </>
  );
}

export default App;
