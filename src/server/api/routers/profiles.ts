import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const profilesRouter = createTRPCRouter({
  getById: publicProcedure.input(z.object({ id: z.string()})).query(async ({input: { id }, ctx}) => {
    const profile = await ctx.db.user.findUnique({where: { id }, select: {
      name: true,
      image: true
    }})

    if (profile === null) return;
    return {
      name: profile.name,
      image: profile.image
    }

  })
});
