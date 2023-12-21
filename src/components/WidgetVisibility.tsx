import { Alert, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useUserLocation } from "~/utils/location";
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function WidgetPercipitation() {
  const session = useSession();
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
  const visibility = weather.weatherData?.current.vis_km;
  return (
      <Card style={{ height: 200 }}>
        <CardContent>
          <VisibilityIcon/> Visibility
          <Typography variant="h3" className="pb-8">
            {visibility} km
          </Typography>
          <Typography variant="body2" className="pb-5">
            Perfectly clear view.
          </Typography>
        </CardContent>
      </Card>
  );
}
