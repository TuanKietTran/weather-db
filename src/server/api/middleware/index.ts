import { Appearance, TemperatureUnit, TimeFormat } from "~/utils/constants";

export function isValidTemperatureUnit (unit: string) {
  return Object.values(TemperatureUnit).includes(unit as TemperatureUnit);
}

export function isValidTimeFormat (format: string) {
  return Object.values(TimeFormat).includes(format as TimeFormat);
}

export function isValidAppearance (appearance: string) {
  return Object.values(Appearance).includes(appearance as Appearance);
}

