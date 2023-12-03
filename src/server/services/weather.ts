// WeatherService.ts
import { type ErrorResponse } from "~/models/ErrorResponse";
import {
  type WeatherInput,
  type WeatherData,
  type WeatherServiceResult,
} from "~/models/Weather";

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const endpoint = "https://api.weatherapi.com/v1/";

const weatherApi = async ({
  latitude,
  longitude,
  api = "current",
  forceAutoIp,
}: WeatherInput): Promise<WeatherServiceResult> => {
  const queryParams = forceAutoIp
    ? `q=auto:ip&key=${apiKey}`
    : `q=${latitude},${longitude}&key=${apiKey}`;
  const url = `${endpoint}${api}.json?${queryParams}`;

  try {
    if (!apiKey) {
      throw new Error("Missing API key");
    }
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = (await response.json()) as ErrorResponse;
      throw new Error(errorData.error.message);
    }

    const data = (await response.json()) as WeatherData;
    return { weatherData: data, error: null };
  } catch (error) {
    return {
      weatherData: null,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while fetching the weather data.",
    };
  }
};

export default weatherApi;
