import React from "react";
import { widgetComponents, type WidgetVariant } from "~/models/Widget";

type WidgetProps = {
  variant: WidgetVariant;
};

export default function Widget({
  variant,
}: WidgetProps) {
  const WidgetComponent = widgetComponents[variant];

  if (!WidgetComponent) {
    return null;
  }

  return (
     <WidgetComponent />
  );
}
