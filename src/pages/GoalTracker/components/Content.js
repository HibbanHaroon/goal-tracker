import React, { useState, useCallback } from "react";
import GoalList from "./GoalList";
import Calendar from "./Calendar";
import { StyledEngineProvider } from "@mui/material/styles";
import "./styles/Content.css";
import FlipClock from "./FlipClock";
import Spotify from "./Spotify";
import Quote from "./Quote";
import ProgressGraph from "./ProgressGraph";

function Content() {
  const [progressRefreshKey, setProgressRefreshKey] = useState(0);

  // Called by GoalList when goals are modified
  const onGoalsChange = useCallback(() => {
    setProgressRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <div className="main-content">
      {/* Top Container is for the all the interactive content, such as goals, spotify player, calendar etc. */}
      <div className="top-container">
        <div className="left-container">
          <FlipClock />
          <Spotify />
        </div>
        <div className="to-do-list">
          <GoalList onGoalsChange={onGoalsChange} />
        </div>
        <div className="right-container">
          <StyledEngineProvider injectFirst>
            <Calendar />
          </StyledEngineProvider>
          <Quote />
        </div>
      </div>

      {/* Yearly Progress Graph */}
      <ProgressGraph refreshKey={progressRefreshKey} />
    </div>
  );
}

export default Content;
