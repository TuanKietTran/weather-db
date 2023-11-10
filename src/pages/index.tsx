// import Link from "next/link";

import WidgetHeadline from "~/components/WidgetHeadline";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
      </header>
      <main className="flex min-h-screen flex-col items-center pt-2">
        <WidgetHeadline />
      </main>
    </>
  );
}
