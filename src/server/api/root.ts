import { profilesRouter } from "~/server/api/routers/profiles";
import { createTRPCRouter } from "~/server/api/trpc";
import { settingsRouter } from "./routers/settings";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  profiles: profilesRouter,
  settings: settingsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;