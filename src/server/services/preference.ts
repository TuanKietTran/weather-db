import { HourInfo } from "~/models/Weather";

function getHour(dateTime: string) {
  // exp 2023-12-02 00:00 -> 00
  const chunks = dateTime.split(" ");
  if (!chunks[1]) return null;
  return chunks[1].split(":")[0];
}

function getDate(dateTime: string) {
  // exp 2023-12-02 00:00 -> 00
  const chunks = dateTime.split(" ");
  if (!chunks[0]) return null;
  return chunks[0];
}

export function convertToTime(hourInfo: HourInfo[]) {
  return hourInfo.map((info) => {
    return {
      ...info,
      time: getHour(info.time),
    };
  });
}


const preferenceService = {
  convertToTime
}

export default preferenceService