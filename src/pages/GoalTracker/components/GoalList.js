import React, { useState } from "react";
import useGoals from "../../../hooks/useGoals";
import GoalsListItems from "./GoalsListItems";
import "./styles/GoalList.css";

const GoalList = ({ onGoalsChange }) => {
  const {
    goals,
    loading,
    addGoal,
    deleteGoal,
    toggleCompleted,
    updateGoalText,
    reorderGoals,
  } = useGoals();

  const [newGoal, setNewGoal] = useState("");

  const handleAddGoal = async () => {
    if (newGoal.trim() !== "") {
      await addGoal(newGoal);
      setNewGoal("");
      onGoalsChange?.();
    }
  };

  const handleDelete = async (goalId) => {
    await deleteGoal(goalId);
    onGoalsChange?.();
  };

  const handleToggle = async (goalId) => {
    await toggleCompleted(goalId);
    onGoalsChange?.();
  };

  const handleReorder = async (sourceIndex, destinationIndex) => {
    await reorderGoals(sourceIndex, destinationIndex);
    onGoalsChange?.();
  };

  const handleTextEdit = async (goalId, originalText, e) => {
    const newText = e.target.textContent.trim();
    // Only update if text has actually changed
    if (newText && newText !== originalText) {
      await updateGoalText(goalId, newText);
      onGoalsChange?.();
    } else if (!newText) {
      e.target.textContent = originalText;
    }
  };

  if (loading) {
    return (
      <div className="goal-list">
        <div className="goal-list-loading">Loading goals...</div>
      </div>
    );
  }

  return (
    <div className="goal-list">
      <div
        contentEditable
        placeholder="Add a goal..."
        className="editable-div"
        onInput={(e) => {
          const text = e.target.textContent;
          setNewGoal(text);
          // Clear innerHTML if text is empty to show placeholder
          if (!text.trim()) {
            e.target.innerHTML = "";
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddGoal();
            setNewGoal("");
            e.target.innerHTML = "";
          }
        }}
      ></div>
      <GoalsListItems
        goals={goals}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onTextEdit={handleTextEdit}
        onReorder={handleReorder}
        showDragHandle={true}
        showDelete={true}
        editable={true}
      />
    </div>
  );
};

export default GoalList;
