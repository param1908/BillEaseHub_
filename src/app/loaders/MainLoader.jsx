import React from "react";
import "./loader.style.scss";

const MainLoader = () => {
  return (
    <div className="loader-wrap">
      <div className="spin-loader" aria-hidden="true"></div>
    </div>
  );
};

export default MainLoader;
