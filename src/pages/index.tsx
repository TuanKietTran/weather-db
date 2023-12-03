// import Link from "next/link";

import WidgetHourlyForecast from "~/components/Widget24h";
import WidgetHeadline from "~/components/WidgetHeadline";
import Placeholder from "~/components/WidgetPlaceHolder";

export default function Home() {
  return (
    <>
      {/* <header className="sticky top-0 z-10 border-b pt-2 bg-black">
        <h1 className="mb-2 px-4 text-lg font-bold ">Home</h1>
      </header> */}
      <main className="flex min-h-screen flex-col pt-2">
        <Placeholder top={0} left={0}>
          <WidgetHeadline />
        </Placeholder>

        <Placeholder top={50} left={0} width={1005} >
          <WidgetHourlyForecast />
        </Placeholder>
      </main>
    </>
  );
}
