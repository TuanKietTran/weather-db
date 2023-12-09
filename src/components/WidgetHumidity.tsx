import { Alert, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useUserLocation } from "~/utils/location";
import WaterIcon from '@mui/icons-material/Water';
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
  const humidity = weather.weatherData?.current.humidity;
  return (
      <Card style={{ height: 200 }}>
        <CardContent>
          <WaterIcon/> Humidity
          <Typography variant="h3" className="pb-8">
            {humidity}%
          </Typography>
          <Typography variant="body2">
            The dew point is 24° right now.
          </Typography>
        </CardContent>
      </Card>
  );
}
