import React, { useRef, useState } from "react";
import Draggable, { type DraggableEventHandler } from "react-draggable";
import { widgetComponents, type WidgetVariant } from "~/models/Widget";

type WidgetProps = {
  top?: number;
  left?: number;
  variant: WidgetVariant;
  onDrag?: DraggableEventHandler;
};

export default function Widget({
  variant,
}: WidgetProps) {
  const WidgetComponent = widgetComponents[variant];

  if (!WidgetComponent) {
    return null;
  }

  return (
    // <Draggable
    //   bounds="parent"
    //   handle=".handle"
    //   defaultPosition={{ x: position.x, y: position.y }}
    //   onStop={onDrag}
    //   nodeRef={nodeRef}
    //   defaultClassName="absolute"
    //   grid={[gridSize, gridSize]} // Set your grid size here (e.g., [20, 20])
    // >
    // <div
    //   className={` ${
    //     isDragging ? "opacity-50" : ""
    //   }`}
    //   ref={nodeRef}
    // >
    <WidgetComponent />
    // </div>
    // </Draggable>
  );
}
