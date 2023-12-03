import { Air, WaterDrop } from "@mui/icons-material";
import { Alert, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { TemperatureUnit } from "~/utils/constants";
import { useUserLocation } from "~/utils/location";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from '@mui/icons-material/WaterDrop';

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

  const precipitation = weather.weatherData?.current.precip_mm;
  return (
    <div className="space-x-2 p-4">
      <Card>
        <CardContent>
          <WaterDropIcon/> Precipitation
          <Typography variant="h3">
            {precipitation} mm
          </Typography>
          <div className="font-bold pb-2">
            in last 24h
            </div>
          <Typography variant="body2">
            Less than 1mm expected in next 24h
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
