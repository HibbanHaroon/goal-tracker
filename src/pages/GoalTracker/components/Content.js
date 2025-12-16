import React, { useState, useCallback } from "react";
import GoalList from "./GoalList";
import Calendar from "./Calendar";
import { StyledEngineProvider } from "@mui/material/styles";
import "./styles/Content.css";
import FlipClock from "./FlipClock";
import Spotify from "./Spotify";
import Quote from "./Quote";
import ProgressGraph from "./ProgressGraph";
import LogDayDialog from "./LogDayDialog";
import AddIcon from "../../../assets/icons/AddIcon";

function Content() {
  const [progressRefreshKey, setProgressRefreshKey] = useState(0);
  const [logDayDialogOpen, setLogDayDialogOpen] = useState(false);

  // Called by GoalList when goals are modified
  const onGoalsChange = useCallback(() => {
    setProgressRefreshKey((prev) => prev + 1);
  }, []);

  const handleLogDay = () => {
    setLogDayDialogOpen(true);
  };

  const handleLogDayClose = () => {
    setLogDayDialogOpen(false);
  };

  const handleLogDaySave = () => {
    onGoalsChange();
  };

  return (
    <div className="main-content">
      {/* Top Container is for the all the interactive content, such as goals, spotify player, calendar etc. */}
      <div className="top-container">
        <div className="left-container">
          <FlipClock />
          <Spotify />
        </div>
        <div className="to-do-list">
          <div className="goal-list-header">
            <h1>Goals</h1>
            <button
              onClick={handleLogDay}
              className="goal-list-header-btn"
              aria-label="Log any day's progress"
              title="Log any day"
            >
              <AddIcon width={20} height={20} />
              <span className="goal-list-header-btn-text">Log a Day</span>
            </button>
          </div>
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
      <LogDayDialog
        open={logDayDialogOpen}
        onClose={handleLogDayClose}
        onSave={handleLogDaySave}
      />
    </div>
  );
}

export default Content;
