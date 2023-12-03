export type TemperatureUnit = "C" | "F";

export type Settings = {
  temperatureUnit: TemperatureUnit;
  timeFormat: string;
  theme?: string;
}