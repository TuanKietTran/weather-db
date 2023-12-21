// pages/index.tsx

import Widget from "~/components/Widget";
import { type WidgetVariant } from "~/models/Widget";
import { api } from "~/utils/api";
import { WidthProvider, Responsive, type Layout } from "react-grid-layout";
import "react-resizable/css/styles.css";
import { type InferGetServerSidePropsType, type NextPage } from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import Toolbox from "~/components/Toolbox";
import DeleteIcon from "@mui/icons-material/Delete";

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

// ... (other imports)

const EditPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { data: widgets } = api.widget.getWidgets.useQuery();
  const context = api.useContext();

  const addWidget = api.widget.createWidget.useMutation({
    onSuccess: (data) => {
      const layout = widgets ?? [];
      context.widget.getWidgets.setData(undefined, [...layout, data]);
    },
  });

  const deleteWidget = api.widget.deleteWidget.useMutation({
    onSuccess: async () => {
      await context.widget.getWidgets.refetch();
    },
  });

  const updateLayout = api.widget.updateLayout.useMutation({
    onSuccess: (layout) => {
      context.widget.getWidgets.setData(undefined, layout);
    },
  });

  const initializeWidgets = api.widget.initWidgets.useMutation({
    onSuccess: (layout) => {
      context.widget.getWidgets.setData(undefined, layout);
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

  const getLastPosition = () => {
    if (!widgets?.length) {
      return { positionX: 0, positionY: 0 };
    }
    return {
      positionX: Math.max(...widgets.map((widget) => widget.positionX ?? 0)),
      positionY: Math.max(...widgets.map((widget) => widget.positionY ?? 0)),
    };
  };

  return (
    <>
      <Toolbox
        variants={widgets?.map((widget) => widget.widget as WidgetVariant)}
        onAddWidget={(widget) =>
          addWidget.mutate({ widget, ...getLastPosition() })
        }
      />
      <main className="min-h-screen pt-2">
        {/* {widgets?.length === 0 && (
          <button
            onClick={() => initializeWidgets.mutate()}
            className="bg-blue-500 text-white p-2 mb-2"
          >
            Initialize Widgets
          </button>
        )} */}

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
              <button
                onClick={() => deleteWidget.mutate({ id: widget.id })}
                className="delete-button absolute top-0 right-0 p-2 z-10"
              >
                <DeleteIcon />
              </button>
              <Widget variant={widget.widget as WidgetVariant} />
            </div>
          ))}
        </ResponsiveReactGridLayout>
      </main>
    </>
  );
};

export default EditPage;
