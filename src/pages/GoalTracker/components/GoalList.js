import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragIcon from "../../../assets/icons/DragIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import Checkbox from "@mui/material/Checkbox";
import { grey } from "@mui/material/colors";
import useGoals from "../../../hooks/useGoals";
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
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  const handleDragEnd = async (result) => {
    setDraggedIndex(null);

    if (!result.destination) return;

    await reorderGoals(result.source.index, result.destination.index);
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

  const getItemStyle = (isDragging, draggableStyle) => ({
    boxShadow: isDragging
      ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      : "none",
    ...draggableStyle,
  });

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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="goal-list" type="group" direction="vertical">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {goals.map((goal, index) => (
                <Draggable
                  key={goal.id}
                  draggableId={goal.id}
                  index={index}
                  isDragDisabled={
                    draggedIndex !== null && draggedIndex !== index
                  }
                >
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <span
                        className="drag-icon-container"
                        {...provided.dragHandleProps}
                        style={{
                          visibility:
                            snapshot.isDragging || hoveredIndex === index
                              ? "visible"
                              : "hidden",
                        }}
                      >
                        <DragIcon width={24} height={24} fill={"white"} />
                      </span>
                      <Checkbox
                        sx={{
                          color: grey[900],
                          "&.Mui-checked": {
                            color: grey[900],
                          },
                        }}
                        checked={goal.completed}
                        onChange={() => handleToggle(goal.id)}
                      />
                      <div
                        className={`list-item ${
                          goal.completed ? "crossed" : ""
                        }`}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleTextEdit(goal.id, goal.text, e)}
                      >
                        {goal.text}
                      </div>
                      <button
                        className="delete-icon"
                        onClick={() => handleDelete(goal.id)}
                        style={{
                          visibility:
                            snapshot.isDragging || hoveredIndex === index
                              ? "visible"
                              : "hidden",
                        }}
                      >
                        <DeleteIcon width={18} height={18} fill={"white"} />
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default GoalList;
