import React from "react";
import { BallTriangle } from "react-loader-spinner";
import "./LoadingPage.css";

/** Returns Loading when API is called. */

function LoadingPage() {
  return (
    <div className="LoadingPage">
      <BallTriangle color="gray" height={100} width={100} />
    </div>
  );
}

export default LoadingPage;
