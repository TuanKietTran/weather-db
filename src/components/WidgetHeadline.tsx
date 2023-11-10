
import { type Settings } from "~/ux/Settings";


export default function WidgetHeadline() {

  const settings: Settings = {
    temperatureUnit: "C",
    timeFormat: ""
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl">My Location</div>
      <div className="font-bold text-sm">Location</div>
      <div className="text-5xl">
        30<sup>o</sup>
      </div>
      <div className="font-bold">Thunderstorm</div>
      <div className="flex gap-2 font-bold">
        <div>
          34<sup>o</sup>
        </div>
        <div>
          25<sup>o</sup>
        </div>
      </div>
    </div>
  );
}
