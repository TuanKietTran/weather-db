import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { WidgetDefinition } from "~/models/Widget";

export const widgetRouter = createTRPCRouter({
  getWidgets: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (!userId) return;

    const widgets = await db.userWidget.findMany({
      where: { userId: userId },
    });

    return widgets;
  }),

  getWidgetById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) return;

      const widget = await db.userWidget.findUnique({
        where: { id: id },
      });

      return widget;
    }),
  createWidget: protectedProcedure
    .input(
      z.object({
        positionX: z.number().or(z.undefined()),
        positionY: z.number().or(z.undefined()), // Int?
        widget: z.string(),
      }),
    )
    .mutation(async ({ input: { positionX, positionY, widget }, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const newWidget = await db.userWidget.create({
        data: {
          userId: userId,
          positionX: positionX,
          positionY: positionY,
          widget: widget,
        },
      });

      return newWidget;
    }),

  updateWidget: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        positionX: z.number().or(z.undefined()),
        positionY: z.number().or(z.undefined()), // Int?
        widget: z.string(),
      }),
    )
    .mutation(async ({ input: { id, positionX, positionY, widget }, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const newWidget = await db.userWidget.update({
        where: { id: id },
        data: {
          positionX: positionX,
          positionY: positionY,
          widget: widget,
        },
      });

      return newWidget;
    }),

  updateLayout: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          positionX: z.number().or(z.undefined()),
          positionY: z.number().or(z.undefined()), // Int?        })
          width: z.number().or(z.undefined()),
        }),
      ),
    )
    .mutation(({ input: widgets, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return widgets.map(async (widget) => {
        return await db.userWidget.update({
          where: { id: widget.id },
          data: {
            positionX: widget.positionX,
            positionY: widget.positionY,
            width: widget.width,
          },
        });
      });
    }),

  deleteWidget: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await db.userWidget.delete({
        where: { id: id },
      });
    }),

  initWidgets: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    if (
      (await db.userWidget.findMany({ where: { userId: userId } })).length > 0
    ) {
      return;
    }

    return WidgetDefinition.map(async (widget, index) => {
      return await db.userWidget.create({
        data: {
          userId: userId,
          positionX: index % 5,
          positionY: Math.floor(index / 5),
          width: 200,
          widget: widget,
        },
      });
    });
  }),
});
