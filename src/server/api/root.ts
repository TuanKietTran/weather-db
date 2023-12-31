import { profilesRouter } from "~/server/api/routers/profiles";
import { createTRPCRouter } from "~/server/api/trpc";
import { weatherRouter } from "./routers/weather";
import { widgetRouter } from "./routers/widget";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  profiles: profilesRouter,
  weather: weatherRouter,
  widget: widgetRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;