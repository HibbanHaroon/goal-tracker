import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Loader from "./components/Loader";

import "./GoalTracker.css";

function GoalTracker() {
  const [showLoader, setShowLoader] = useState(true);
  const [showMainContent, setMainContentVisible] = useState(false);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 2700);

    const mainContentTimeout = setTimeout(() => {
      setMainContentVisible(true);
    }, 3000);

    return () => {
      clearTimeout(loaderTimeout);
      clearTimeout(mainContentTimeout);
    };
  }, []);

  return (
    <div className="goal-tracker">
      {showLoader && <Loader></Loader>}{" "}
      <div
        style={{
          opacity: showMainContent ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <Header />
        <Content />
      </div>
    </div>
  );
}

export default GoalTracker;
