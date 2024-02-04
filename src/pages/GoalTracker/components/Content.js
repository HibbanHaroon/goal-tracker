import React from "react";
import "./styles/Content.css";
import GoalList from "./GoalList";

function Content() {
  return (
    <div className="main-content">
      {/* Top Container is for the all the interactice content, such as goals, spotify player, calendar etc. */}
      <div className="top-container">
        <div className="to-do-list">
          <GoalList />
        </div>
      </div>
    </div>
  );
}

export default Content;
