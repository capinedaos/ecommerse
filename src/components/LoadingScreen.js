import React from "react";
import "../styles/LoadingScreen.css"

const LoadingScreen = () => {
  return (
    <div className="overlay">
      <div className="lds-hourglass"></div>
    </div>
  );
};

export default LoadingScreen;
