import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragIcon from "../../../assets/icons/DragIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import Checkbox from "@mui/material/Checkbox";
import { grey } from "@mui/material/colors";
import "./styles/GoalList.css";

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const addGoal = () => {
    if (newGoal.trim() !== "") {
      setGoals([
        { id: Date.now().toString(), content: newGoal, crossed: false },
        ...goals,
      ]);
      setNewGoal("");
    }
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const toggleCrossed = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, crossed: !goal.crossed } : goal
      )
    );
  };

  const moveCheckedToEnd = (a, b) => {
    if (a.crossed && !b.crossed) {
      return 1;
    } else if (!a.crossed && b.crossed) {
      return -1;
    } else {
      return 0;
    }
  };

  const handleDragEnd = (result) => {
    setDraggedIndex(null);

    if (!result.destination) return;

    const updatedGoals = Array.from(goals);
    const [movedGoal] = updatedGoals.splice(result.source.index, 1);
    updatedGoals.splice(result.destination.index, 0, movedGoal);

    setGoals(updatedGoals);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    boxShadow: isDragging
      ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      : "none",

    ...draggableStyle,
  });

  return (
    <div className="goal-list">
      <div
        contentEditable
        placeholder="Add a goal..."
        className="editable-div"
        onInput={(e) => setNewGoal(e.target.textContent)}
        onKeyDown={(e) =>
          e.key === "Enter" &&
          (e.preventDefault(),
          addGoal(),
          setNewGoal(""),
          (e.target.textContent = ""))
        }
      ></div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="goal-list" type="group" direction="vertical">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {goals.sort(moveCheckedToEnd).map((goal, index) => (
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
                        <DragIcon width={18} height={18} fill={"white"} />
                      </span>
                      <Checkbox
                        sx={{
                          color: grey[900],
                          "&.Mui-checked": {
                            color: grey[900],
                          },
                        }}
                        checked={goal.crossed}
                        onChange={() => toggleCrossed(goal.id)}
                      ></Checkbox>
                      <div
                        className={`list-item ${goal.crossed ? "crossed" : ""}`}
                        contentEditable
                      >
                        {goal.content}
                      </div>
                      <button
                        className="delete-icon"
                        onClick={() => deleteGoal(goal.id)}
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
