import { z } from "zod";
import useWeatherApi from "~/server/services/weather";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const weatherRouter = createTRPCRouter({
  getWeather: publicProcedure
    .input(
      z.object({
        latitude: z.number().or(z.null()),
        longitude: z.number().or(z.null()),
      }),
    )
    .query(async ({ input: { latitude, longitude } }) => {
      if (latitude === null || longitude === null) {
        return {
          weatherData: null,
          loading: true,
        }
      }

      const { weatherData, loading, error } = await useWeatherApi(
        latitude,
        longitude,
      );

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error,
        });
      }
      return {
        weatherData,
        loading,
      }
    }),
});
