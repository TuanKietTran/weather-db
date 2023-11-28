import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Appearance, TemperatureUnit, TimeFormat } from "~/utils/constants";
import { isValidAppearance, isValidTemperatureUnit } from "../middleware";

export const profilesRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      const profile = await ctx.db.user.findUnique({
        where: { id },
        select: {
          name: true,
          image: true,
          preference: true,
        },
      });

      if (profile === null) return;

      if (profile.preference === null) {
        profile.preference = await ctx.db.userPreference.create({
          data: {
            userId: id,
            appearance: Appearance.light,
            temperatureUnit: TemperatureUnit.C,
            timeFormat: TimeFormat.h24,
          },
        });
      }

      return {
        name: profile.name,
        image: profile.image,
        preference: profile.preference,
      };
    }),
  
  getUserPreference: publicProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) return;

      const preference = await ctx.db.userPreference.findUnique({
        where: { userId: userId },
      });

      if (preference === null) return; 

      return {
        appearance: preference.appearance,
        temperatureUnit: preference.temperatureUnit,
        timeFormat: preference.timeFormat,
      };
    }),

  postUserSetting: protectedProcedure
    .input(
      z.object({
        appearance: z.string(),
        temperatureUnit: z.string(),
        timeFormat: z.string(),
      }),
    )
    .mutation(async ({ input: preference, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) return;

      const oldPreference = await ctx.db.userPreference.findUnique({
        where: { userId: userId },
      });

      if (oldPreference === null) return;

      const preferenceToAdd = {
        appearance: isValidAppearance(preference.appearance)
          ? preference.appearance
          : oldPreference.appearance,
        temperatureUnit: isValidTemperatureUnit(preference.temperatureUnit)
          ? preference.temperatureUnit
          : oldPreference.temperatureUnit,
        timeFormat: isValidTemperatureUnit(preference.timeFormat)
          ? preference.timeFormat
          : oldPreference.timeFormat,
      };


      await ctx.db.userPreference.update({
        where: { userId: userId },
        data: {
          ...preferenceToAdd,
        },
      });

      return {
        ...preferenceToAdd
      };
    }),
});
