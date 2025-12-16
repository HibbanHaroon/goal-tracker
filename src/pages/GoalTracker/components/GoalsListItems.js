import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragIcon from "../../../assets/icons/DragIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import Checkbox from "@mui/material/Checkbox";
import { grey } from "@mui/material/colors";

const GoalsListItems = ({
  goals,
  onToggle,
  onDelete,
  onTextEdit,
  onReorder,
  showDragHandle = true,
  showDelete = true,
  editable = true,
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleDragEnd = async (result) => {
    setDraggedIndex(null);

    if (!result.destination) return;

    if (onReorder) {
      await onReorder(result.source.index, result.destination.index);
    }
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    boxShadow: isDragging
      ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      : "none",
    ...draggableStyle,
  });

  if (showDragHandle && onReorder) {
    return (
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
                      {showDragHandle && (
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
                      )}
                      <Checkbox
                        sx={{
                          color: grey[900],
                          "&.Mui-checked": {
                            color: grey[900],
                          },
                        }}
                        checked={goal.completed}
                        onChange={() => onToggle?.(goal.id)}
                      />
                      <div
                        className={`list-item ${
                          goal.completed ? "crossed" : ""
                        }`}
                        contentEditable={editable}
                        suppressContentEditableWarning
                        onBlur={(e) => onTextEdit?.(goal.id, goal.text, e)}
                      >
                        {goal.text}
                      </div>
                      {showDelete && (
                        <button
                          className="delete-icon"
                          onClick={() => onDelete?.(goal.id)}
                          style={{
                            visibility:
                              snapshot.isDragging || hoveredIndex === index
                                ? "visible"
                                : "hidden",
                          }}
                        >
                          <DeleteIcon width={18} height={18} fill={"white"} />
                        </button>
                      )}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  // Non-draggable version for dialog
  return (
    <ul>
      {goals.map((goal) => (
        <li key={goal.id}>
          <Checkbox
            sx={{
              color: grey[900],
              "&.Mui-checked": {
                color: grey[900],
              },
            }}
            checked={goal.completed}
            onChange={() => onToggle?.(goal.id)}
          />
          <span className={goal.completed ? "crossed" : ""}>{goal.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default GoalsListItems;
