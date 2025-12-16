import React, { useState, useEffect, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { UserAuth } from "../../../context/AuthContext";
import { getCurrentGoals } from "../../../api/services/goal-service";
import { saveDailyProgress } from "../../../api/services/goal-service";
import { getDailyProgress } from "../../../api/services/goal-service";
import { getDateKey } from "../../../utils/date-utils";
import GoalsListItems from "./GoalsListItems";
import "./styles/LogDayDialog.css";

const LogDayDialog = ({ open, onClose, onSave }) => {
  const { user } = UserAuth();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [goals, setGoals] = useState([]);
  const [completedGoalIds, setCompletedGoalIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastLoadedDateKey, setLastLoadedDateKey] = useState(null);

  const fetchGoals = useCallback(async () => {
    if (!user?.uid) return;

    setLoading(true);
    try {
      const { goals: fetchedGoals, error } = await getCurrentGoals(user.uid);
      if (error) {
        console.error("Error fetching goals:", error);
      } else {
        // Set all goals as uncompleted initially
        const goalsWithStatus = fetchedGoals.map((goal) => ({
          ...goal,
          completed: false,
        }));
        setGoals(goalsWithStatus);
        // Reset completed goals when fetching
        setCompletedGoalIds([]);
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  // Load progress for a specific date
  const loadProgressForDate = useCallback(
    async (date) => {
      if (!user?.uid || !date) return;

      const dateKey = getDateKey(date.toDate());

      // Don't reload if it's the same date
      if (dateKey === lastLoadedDateKey) {
        return;
      }

      try {
        const { completedIds, error } = await getDailyProgress(
          user.uid,
          dateKey
        );

        if (error) {
          console.error("Error fetching daily progress:", error);
          return;
        }

        // Update goals state to mark matching goals as completed
        setGoals((prevGoals) => {
          const currentGoalIds = new Set(prevGoals.map((g) => g.id));
          const matchingCompletedIds = completedIds.filter((id) =>
            currentGoalIds.has(id)
          );

          // Update completed goal IDs to only include those that exist in current goals
          setCompletedGoalIds(matchingCompletedIds);

          return prevGoals.map((goal) => ({
            ...goal,
            completed: matchingCompletedIds.includes(goal.id),
          }));
        });

        setLastLoadedDateKey(dateKey);
      } catch (error) {
        console.error("Error loading progress for date:", error);
      }
    },
    [user?.uid, lastLoadedDateKey]
  );

  // Fetch current goals when dialog opens
  useEffect(() => {
    if (open && user?.uid) {
      fetchGoals();
      // Reset last loaded date when dialog opens
      setLastLoadedDateKey(null);
    }
  }, [open, user?.uid, fetchGoals]);

  // Load progress when goals are loaded and date is available
  useEffect(() => {
    if (open && user?.uid && goals.length > 0 && selectedDate) {
      loadProgressForDate(selectedDate);
    }
  }, [open, user?.uid, goals.length, selectedDate, loadProgressForDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    // Reset completed goals when date changes
    setCompletedGoalIds([]);
    // Update goals to reflect reset
    setGoals((prev) => prev.map((goal) => ({ ...goal, completed: false })));
    // Progress will be loaded by the useEffect that watches selectedDate
  };

  const handleToggleGoal = (goalId) => {
    setCompletedGoalIds((prev) => {
      const newIds = prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId];

      // Update goals state to reflect the change
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
        )
      );

      return newIds;
    });
  };

  const handleSave = async () => {
    if (!user?.uid || !selectedDate) return;

    setSaving(true);
    try {
      const dateKey = getDateKey(selectedDate.toDate());
      const totalGoals = goals.length;

      const { success, error } = await saveDailyProgress(
        user.uid,
        dateKey,
        completedGoalIds,
        totalGoals
      );

      if (error) {
        console.error("Error saving daily progress:", error);
        alert(`Error saving: ${error}`);
      } else if (success) {
        onSave?.();
        handleClose();
      }
    } catch (error) {
      console.error("Error saving daily progress:", error);
      alert(`Error saving: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setSelectedDate(dayjs());
    setCompletedGoalIds([]);
    setGoals([]);
    setLastLoadedDateKey(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      className="log-day-dialog"
    >
      <DialogTitle className="log-day-title">
        <div className="log-day-title-wrapper">
          <h2>Forgot to log a day? That’s okay.</h2>
          <p className="log-day-subtitle">
            Choose a date and check off the goals you completed.
          </p>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="log-day-dialog-content">
          <div className="log-day-date-picker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                maxDate={dayjs()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </div>

          <div className="log-day-goals-list">
            <h3>Goals</h3>
            {loading ? (
              <div className="log-day-loading">Loading goals...</div>
            ) : goals.length === 0 ? (
              <div className="log-day-empty">No goals available</div>
            ) : (
              <div className="log-day-goals-container">
                <GoalsListItems
                  goals={goals}
                  onToggle={handleToggleGoal}
                  showDragHandle={false}
                  showDelete={false}
                  editable={false}
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={saving}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={saving || loading}
          sx={{
            backgroundColor: grey[900],
            "&:hover": {
              backgroundColor: grey[800],
            },
          }}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogDayDialog;
