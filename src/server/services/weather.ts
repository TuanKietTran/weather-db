// WeatherService.ts
interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface CurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

interface WeatherData {
  location: Location;
  current: CurrentWeather;
}

interface ErrorResponse {
  error: {
    message: string;
  };
}

export interface WeatherServiceResult {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const useWeatherApi = async (
  latitude: number,
  longitude: number,
): Promise<WeatherServiceResult> => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const endpoint = 'https://api.weatherapi.com/v1/current.json';
  const queryParams = `q=${latitude},${longitude}&key=${apiKey}`;
  const url = `${endpoint}?${queryParams}`;

  try {
    if (!apiKey) {
      throw new Error('Missing API key');
    }
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = (await response.json()) as ErrorResponse;
      throw new Error(errorData.error.message);
    }

    const data = (await response.json()) as WeatherData;
    return { weatherData: data, loading: false, error: null };
  } catch (error) {
    return {
      weatherData: null,
      loading: false,
      error:
        error instanceof Error ? error.message :
        'An error occurred while fetching the weather data.',
    };
  }
};

export default useWeatherApi;
