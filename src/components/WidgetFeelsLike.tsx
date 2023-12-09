import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { TemperatureUnit } from "~/utils/constants";
import { useUserLocation } from "~/utils/location";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

export default function WidgetFeelsLike() {
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

  const getFeelLikeData = () => {
    const id = session.data?.user?.id;
    const authenticated = session.status === "authenticated";
    const preference =
      authenticated && id
        ? context.profiles.getById.getData({ id })?.preference
        : null;
    const temp =
      preference?.temperatureUnit.toString() === TemperatureUnit.F.toString()
        ? weather.weatherData?.current.feelslike_f
        : weather.weatherData?.current.feelslike_c;
    return {
      authenticated,
      temp,
      comments: getCommentsBasedOnTemperature(temp ?? 0),
    };
  };

  const data = getFeelLikeData();

  return (
      <Card style={{ height: 200 }}>
        <CardContent>
            <DeviceThermostatIcon /> Feels like
          <Typography variant="h3" className="pb-8">
            {data.temp}°
          </Typography>
          <Typography variant="body2">{data.comments}</Typography>
        </CardContent>
      </Card>
  );
}

function getCommentsBasedOnTemperature(feelsLikeTemperature: number): string {
  if (feelsLikeTemperature > 30) {
    return "It's scorching hot out there! Stay hydrated.";
  } else if (feelsLikeTemperature > 20) {
    return "Enjoy the pleasant weather!";
  } else if (feelsLikeTemperature > 10) {
    return "It's a bit chilly. Grab a jacket!";
  } else {
    return "Brrr, it's cold. Bundle up!";
  }
}
