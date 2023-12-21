// import Link from "next/link";
import Widget from "~/components/Widget";
import { type WidgetVariant } from "~/models/Widget";
import { api } from "~/utils/api";
import { ssgHelper } from "~/server/api/ssgHelper";
import { type InferGetServerSidePropsType, type NextPage } from "next";
import { Responsive, WidthProvider } from "react-grid-layout";
import WidgetHeadline from "~/components/WidgetHeadline";

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
}

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
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
        {widgets ? (
          widgets.map((widget) => (
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
          ))
        ) : (
          <div
            key="start"
            data-grid={{
              w: 10,
              h: 2,
              x: 0,
              y: 0,
              static: true,
            }}
          >
            {" "}
            <WidgetHeadline />{" "}
          </div>
        )}
      </ResponsiveReactGridLayout>
    </main>
  );
};

export default Home;
