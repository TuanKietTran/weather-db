import { DragIndicator } from "@mui/icons-material";
import React, { useState, type ReactNode, useRef } from "react";
import Draggable from "react-draggable";

interface DraggableWidgetPlaceholderProps {
  children: ReactNode;
  top: number;
  left: number;
  width?: number;
}

const Placeholder: React.FC<DraggableWidgetPlaceholderProps> = ({
  children,
  top,
  left,
  width = 200, // Default width if not provided
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  return (
    <Draggable
      handle=".handle"
      defaultPosition={{ x: left, y: top }}
      onStart={handleDragStart}
      onStop={handleDragStop}
      nodeRef={nodeRef}
    >
      <div
        className={`draggable-widget transition-opacity ease-in-out duration-300 ${isDragging ? "opacity-50" : ""}`}
        style={{ width }}
        ref={nodeRef}
      >
        <div className="handle">
          <DragIndicator />
        </div>
        {children}
      </div>
    </Draggable>
  );
};

export default Placeholder;
