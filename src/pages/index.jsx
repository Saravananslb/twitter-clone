import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { Base } from "../components/base";
import { ImageOverlay } from "../components/imageOverlay";
import { Modal } from "../components/modal";
import { Home } from "./home";
import { ViewTweet } from "./viewTweet";
import { Profile } from "./profile";
import { SignIn } from "./auth/signIn";
import { SignUp } from "./auth/signUp";

export const Pages = () => {
  const navigate = useNavigate();

  const onNavClick = (path) => {
    navigate(path);
  };

  return (
    <Base onNavClick={onNavClick}>
      <Routes>
        <Route element={<Home />} path={"/"} />
        <Route element={<SignIn />} path={"/signin"} />
        <Route element={<SignUp />} path={"/signup"} />
        <Route element={<ViewTweet />} path={"/viewTweet/:tweetId"} />
        <Route element={<Profile />} path={"/profile"} />
        {/* <Route path={"/viewTweet"}>
          <ViewTweet />
        </Route>
        <Route path={"/profile"}>
          <Profile />
        </Route> */}
        {/* <Route>
          <Profile />
        </Route> */}
      </Routes>
    </Base>
  );
};
