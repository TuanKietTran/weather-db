// Create an object to map variant names to their respective components

import feelsLike from "../components/WidgetFeelsLike";
import headline from "../components/WidgetHeadline";
import hourly from "../components/WidgetHourlyForecast";
import humidity from "../components/WidgetHumidity";
import precipitation from "../components/WidgetPrecipitation";
import visibility from "../components/WidgetVisibility";
import wind from "../components/WidgetWind";

export const widgetComponents = {
  headline,
  feelsLike,
  humidity,
  precipitation,
  visibility,
  wind,
  hourly,
  // WigetChart, // Again, assuming there's a typo in the filename
};

export const widgetDisplayNames: Record<keyof typeof widgetComponents, string> = {
  headline: "Headline",
  feelsLike: "Feels Like",
  humidity: "Humidity",
  precipitation: "Precipitation",
  visibility: "Visibility",
  wind: "Wind",
  hourly: "Hourly",
  // WidgetChart: "Chart", // Assuming there's a typo in the filename
};

export const WidgetDefinition = Object.keys(widgetComponents);

export type WidgetVariant = keyof typeof widgetComponents;