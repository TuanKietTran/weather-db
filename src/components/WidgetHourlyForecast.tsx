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
import WeatherIcon from "./WeatherIcon";

export default function WidgetHourlyForecast() {
  const session = useSession();
  const context = api.useContext();
  const { latitude, longitude, error: locationError } = useUserLocation();
  const { data: forecast, error: forecastError } =
    api.weather.getHourlyForecast.useQuery({
      latitude,
      longitude,
    });

  const error = locationError ?? forecastError?.message;

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!forecast?.hourly || session.status === "loading") {
    return <CircularProgress />;
  }

  const getData = () => {
    const id = session.data?.user?.id;
    const authenticated = session.status === "authenticated";
    const preference =
      authenticated && id
        ? context.profiles.getById.getData({ id })?.preference
        : null;

    const hourly = forecast.hourly.map((hour) => {
      return {
        time: hour.time,
        temp:
          `${(preference?.temperatureUnit.toString() ===
          TemperatureUnit.F.toString()
            ? hour.temp_f
            : hour.temp_c)}°${preference?.temperatureUnit ?? TemperatureUnit.C}`,
        icon: hour.condition.code,
        chance_of_rain: hour.chance_of_rain,
        precipitation: hour.precip_mm * 1000,
      };
    });

    return hourly;
  };

  const isDay = (time: string | null | undefined) =>
    parseInt(time ?? "0") >= 6 && parseInt(time ?? "0") < 18;

  const hourly = getData();

  return (
    <div className="flex overflow-x-auto space-x-2 py-2 w-full">
      {hourly.map((hour, index) => (
        <Card key={index} className="flex-shrink-0" style={{ minWidth: 120, height: 200 }} >
          <CardContent >
            <Typography variant="h6">{hour.time}</Typography>
            <WeatherIcon code={hour.icon} isDay={isDay(hour.time)} className="justify-center" />
            <Typography variant="body1" align="center">{hour.temp}</Typography>
            <Typography variant="caption" align="center">
              Precipitation: {hour.precipitation}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
