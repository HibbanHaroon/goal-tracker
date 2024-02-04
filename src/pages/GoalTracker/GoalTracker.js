import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";

import "./GoalTracker.css";

function GoalTracker() {
  return (
    <div className="goal-tracker">
      <Header />
      <Content />
    </div>
  );
}

export default GoalTracker;
