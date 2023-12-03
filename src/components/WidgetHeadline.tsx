import { Air, WaterDrop } from "@mui/icons-material";
import { Alert, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { TemperatureUnit } from "~/utils/constants";
import { useUserLocation } from "~/utils/location";

export default function WidgetHeadline() {
  const session = useSession();
  const context = api.useContext();
  const { latitude, longitude, error: locationError } = useUserLocation();

  const { data: weather, error: weatherError } =
    api.weather.getWeather.useQuery({
      latitude,
      longitude,
    });

  const error =
    locationError ?? weatherError?.message;

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!weather || weather?.loading || session.status === "loading") {
    return <CircularProgress />;
  }

  const getHeadlineData = () => {
    const id = session.data?.user?.id;
    const authenticated = session.status === "authenticated";
    const preference = authenticated && id
      ? context.profiles.getById.getData({ id })?.preference
      : null;
    const location = weather.weatherData?.location.name;
    const condition = weather.weatherData?.current.condition.text;
    const icon = weather.weatherData?.current.condition.icon;
    const temp =
      preference?.temperatureUnit.toString() === TemperatureUnit.F.toString()
        ? weather.weatherData?.current.temp_f
        : weather.weatherData?.current.temp_c;
    const wind = weather.weatherData?.current.wind_kph;
    const humidity = weather.weatherData?.current.humidity;
    return {
      authenticated,
      location,
      condition,
      icon,
      temp,
      wind,
      humidity,
      unit: preference?.temperatureUnit ?? TemperatureUnit.C,
    };
  };

  const data = getHeadlineData();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl">My Location</div>
      <div className="font-bold text-sm">{data.location}</div>
      <div className="text-5xl">
        {data.temp}
        <sup>o</sup>
        {data.unit}
      </div>
      <div className="font-bold">{data.condition}</div>
      <div className="flex gap-2 font-bold">
        <div>
          <WaterDrop />
          {data.humidity}%
        </div>
        <div>
          <Air />
          {data.wind} kpm
        </div>
      </div>
    </div>
  );
}