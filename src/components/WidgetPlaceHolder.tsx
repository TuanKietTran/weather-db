import { Card, CardContent, IconButton } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { api } from "~/utils/api";

export default function PlaceHolder() {
  const colorChange = "hover:bg-gray-200 focus-visible:bg-gray-200";

  const context = api.useContext();

  const addWidget = api.widget.createWidget.useMutation({
    onSuccess: async (data) => {
      await context.widget.getWidgets.refetch();
    },
  });

  const onClick = () => {
    // addWidget.mutate();
  };

  return (
    <Card
      style={{ height: 200 }}
      onClick={onClick}
      className={`flex items-center justify-center cursor-pointer ${colorChange}`}
    >
      <CardContent>
        <IconButton>
          <AddIcon sx={{ fontSize: 70 }} />
        </IconButton>
      </CardContent>
    </Card>
  );
}
