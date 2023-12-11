// pages/index.tsx

import Widget from "~/components/Widget";
import { WidgetVariant } from "~/models/Widget";
import { api } from "~/utils/api";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import "react-resizable/css/styles.css";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { ssgHelper } from "~/server/api/ssgHelper";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface HomeProps {
  widgets: {
    id: string;
    positionX: number;
    positionY: number;
    width: number;
  }[];
}

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
  const context = api.useContext();

  const updateLayout = api.widget.updateLayout.useMutation({
    onSuccess: async () => {
      await context.widget.getWidgets.refetch();
    },
  });

  const initializeWidgets = api.widget.initWidgets.useMutation({
    onSuccess: async () => {
      await context.widget.getWidgets.refetch();
    },
  });

  const onLayoutChange = (layout: Layout[]) => {
    const data = layout.map((item) => ({
      id: item.i,
      positionX: item.x,
      positionY: item.y,
      width: item.w,
    }));
    updateLayout.mutate(data);
  };

  return (
    <main className=" min-h-screen pt-2">
      {widgets?.length === 0 && (
        <button
          onClick={() => initializeWidgets.mutate()}
          className="bg-blue-500 text-white p-2 mb-2"
        >
          Initialize Widgets
        </button>
      )}

      <ResponsiveReactGridLayout
        compactType={"horizontal"}
        className="layout relative"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 2, xxs: 1 }}
        rowHeight={100}
        maxRows={4}
        onLayoutChange={onLayoutChange}
      >
        {widgets?.map((widget) => (
          <div
            key={widget.id}
            data-grid={{
              w: widget.width ?? 2,
              h: 2,
              x: widget.positionX ?? 0,
              y: widget.positionY ?? 0,
              resizeHandles: ["w", "e"],
            }}
          >
            <Widget variant={widget.widget as WidgetVariant} />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </main>
  );
};

export default Home;
