import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useUserLocation } from "~/utils/location";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

export default function WidgetPrecipitation() {
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

  const precipitation = weather.weatherData?.current.precip_mm;
  return (
      <Card style={{ height: 200 }}>
        <CardContent>
          <WaterDropIcon /> Precipitation
          <Typography variant="h4">{precipitation} mm
          </Typography> 
          <div className="font-bold pb-6">in last 24h</div>
          <Typography variant="body2">
            Less than 6mm expected in next 24h
          </Typography>
        </CardContent>
      </Card>
  );
}
