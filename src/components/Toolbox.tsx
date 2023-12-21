import {
  WidgetDefinition,
  widgetDisplayNames,
  type WidgetVariant,
} from "~/models/Widget";
import { Card, CardContent, Typography, Paper } from "@mui/material";

type ToolboxProps = {
  variants: WidgetVariant[] | undefined;
  onAddWidget: (variant: WidgetVariant) => void;
};

export default function Toolbox({ variants, onAddWidget }: ToolboxProps) {
  const remainingVariants = !variants
    ? WidgetDefinition
    : WidgetDefinition.filter(
        (key) => !variants.includes(key as WidgetVariant),
      );

  return (
    <Paper elevation={3} className="p-4 rounded-md">
      <Typography variant="h4" component="div" className="pb-4">
        Widgets
      </Typography>
      <div className="flex flex-row gap-5 flex-wrap">
        {remainingVariants?.map((variant, index) => (
          <div
            key={index}
            onClick={() => onAddWidget(variant as WidgetVariant)}
          >
            <Card className="bg-white p-4 rounded-md shadow-md">
              <CardContent>
                <Typography variant="h5" component="div">
                  {widgetDisplayNames[variant as WidgetVariant]}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Paper>
  );
}
