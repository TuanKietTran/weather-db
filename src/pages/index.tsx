// import Link from "next/link";
import Widget from "~/components/Widget";
import { type WidgetVariant } from "~/models/Widget";
import { api } from "~/utils/api";
import { ssgHelper } from "~/server/api/ssgHelper";
import { type InferGetServerSidePropsType, type NextPage } from "next";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export async function getServerSideProps() {
  const ssg = ssgHelper();
  await ssg.widget.getWidgets.prefetch();
  await ssg.weather.getWeather.prefetch({ forceAutoIp: true });
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const { data: widgets } = api.widget.getWidgets.useQuery();

  return (
    <main className=" min-h-screen pt-2">
      <ResponsiveReactGridLayout
        compactType={"horizontal"}
        className="layout relative"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 2, xxs: 1 }}
        rowHeight={100}
        maxRows={4}
      >
        {widgets?.map((widget) => (
          <div
            key={widget.id}
            data-grid={{
              w: widget.width ?? 2,
              h: 2,
              x: widget.positionX ?? 0,
              y: widget.positionY ?? 0,
              static: true,
            }}
          >
            <Widget variant={widget.widget as WidgetVariant} />
          </div>
        ))}
      </ResponsiveReactGridLayout>

    </main>
  );
}

export default Home;
