// import Link from "next/link";
import Widget from "~/components/Widget";
import { type WidgetVariant } from "~/models/Widget";
import { api } from "~/utils/api";
import { WidthProvider, Responsive, type Layout } from "react-grid-layout";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function Home() {
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
}
