import { z } from "zod";
import weatherApi from "~/server/services/weather";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { convertToTime } from "~/server/services/preference";

export const weatherRouter = createTRPCRouter({
  getWeather: publicProcedure
    .input(
      z.object({
        latitude: z.number().or(z.undefined()),
        longitude: z.number().or(z.undefined()),
        forceAutoIp: z.boolean().or(z.undefined()),
      }),
    )
    .query(async ({ input: { latitude, longitude, forceAutoIp } }) => {
      if (latitude === null || longitude === null) {
        return {
          weatherData: null,
          loading: true,
        };
      }

      const { weatherData, error } = await weatherApi({
        latitude,
        longitude,
        api: "current",
        forceAutoIp: forceAutoIp,
      });

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error,
        });
      }
      return {
        weatherData,
        loading: false,
      };
    }),
  getForecast: publicProcedure
    .input(
      z.object({
        latitude: z.number().or(z.undefined()),
        longitude: z.number().or(z.undefined()),
        days: z.number().or(z.undefined()),
      }),
    )
    .query(async ({ input: { latitude, longitude, days } }) => {
      const { weatherData, error } = await weatherApi({
        latitude,
        longitude,
        api: "forecast",
        forceAutoIp: latitude === null || longitude === null,
      });

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error,
        });
      }

      return {
        weatherData,
        loading: false,
      };
    }),

  getHourlyForecast: publicProcedure
    .input(
      z.object({
        latitude: z.number().or(z.undefined()),
        longitude: z.number().or(z.undefined()),
      })
    ).query(async ({ input: { latitude, longitude } }) => {
      const { weatherData, error } = await weatherApi({
        latitude,
        longitude,
        api: "forecast",
        forceAutoIp: latitude === null || longitude === null,
      });

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error,
        });
      }

      if (!weatherData?.forecast?.forecastday[0]?.hour) {
        return {
          hourly: null,
          loading: true,
        }
      }

      return {
        hourly: convertToTime(weatherData.forecast.forecastday[0].hour),
        loading: false,
      }
    })
});
