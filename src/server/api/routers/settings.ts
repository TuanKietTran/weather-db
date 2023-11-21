import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const settingsRouter = createTRPCRouter({
  getUserSetting: publicProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) return;

      const setting = await ctx.db.userPreference.findUnique({
        where: { userId: userId },
        select: {
          appearance: true,
          temperatureUnits: true,
          timeFormat: true,
        },
      });

      if (setting === null) return;
      return {
        ...setting,
      };
    }),
});
