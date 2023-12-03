import { Air, WaterDrop } from "@mui/icons-material";
import { Alert, Card, CardContent, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { TemperatureUnit } from "~/utils/constants";
import { useUserLocation } from "~/utils/location";

export default function WidgetPercipitation() {
  const session = useSession();
  const context = api.useContext();
  const { latitude, longitude, error: locationError } = useUserLocation();

  const { data: weather, error: weatherError } =
    api.weather.getWeather.useQuery({
      latitude,
      longitude,
    });

  const error = locationError ?? weatherError?.message;

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!weather || weather?.loading || session.status === "loading") {
    return <CircularProgress />;
  }

  return (
    <div className="space-x-2 p-4">
      <Card>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
