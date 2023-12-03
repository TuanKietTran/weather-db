// import Link from "next/link";

import WidgetHourlyForecast from "~/components/Widget24h";
import WidgetFeelsLike from "~/components/WidgetFeelsLike";
import WidgetHeadline from "~/components/WidgetHeadline";
import WidgetPercipitation from "~/components/WidgetPercipitation";
import Placeholder from "~/components/WidgetPlaceHolder";
import WidgetHumidity from "~/components/WidgetHumidity";
import WidgetVisibility from "~/components/WidgetVisibility";
import WidgetWind from "~/components/WidgetWind";

export default function Home() {
  return (
    <>
      {/* <header className="sticky top-0 z-10 border-b pt-2 bg-black">
        <h1 className="mb-2 px-4 text-lg font-bold ">Home</h1>
      </header> */}
      <main className="flex min-h-screen flex-col pt-2">
        <Placeholder top={0} left={200}>
          <WidgetHeadline />
        </Placeholder>

        <Placeholder top={0} left={0} width={1005} >
          <WidgetHourlyForecast />
        </Placeholder>

        <Placeholder top={0} left={0} width={200} >
          <WidgetFeelsLike />
        </Placeholder>

        <Placeholder top={-252} left={200} width={200} >
          <WidgetPercipitation />
        </Placeholder>

        <Placeholder top={-504} left={400} width={200} >
          <WidgetHumidity />
        </Placeholder>

        <Placeholder top={-756} left={600} width={200} >
          <WidgetVisibility />
        </Placeholder>

        <Placeholder top={-756 - 252} left={800} width={200} >
          <WidgetWind />
        </Placeholder>
      </main>
    </>
  );
}
