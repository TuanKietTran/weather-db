import { Alert, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useUserLocation } from "~/utils/location";
import AirIcon from '@mui/icons-material/Air';
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
  const wind = weather.weatherData?.current.wind_kph;
  return (
    <div className="space-x-2 p-4">
      <Card>
        <CardContent>
          <AirIcon/> Wind
          <Typography variant="h3" className="pb-4">
            {wind} km/h
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
