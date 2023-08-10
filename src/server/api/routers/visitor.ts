import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const visitorRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        ip: z.string().optional(),
        city: z.string().optional(),
        country: z.string().optional(),
        region: z.string().optional(),
        isp: z.string().optional(),
        urlId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.visitor.create({
        data: {
          ip: input.ip,
          city: input.city,
          country: input.country,
          region: input.region,
          isp: input.isp,
          urlId: input.urlId,
        },
      });
    }),
  getAll: publicProcedure
    .input(
      z.object({
        urlId: z.string(),
        limit: z.number(),
        skip: z.number().optional(),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const visitors = await ctx.prisma.visitor.findMany({
        where: {
          urlId: input.urlId,
        },

        take: input.limit + 1,
        skip: input.skip,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: {
          visitedAt: "desc",
        },
      });

      let nextCursor: typeof input.cursor = undefined;
      if (visitors.length > input.limit) {
        const nextItem = visitors.pop();
        nextCursor = nextItem?.id;
      }
      return {
        visitors,
        nextCursor,
        len: visitors.length,
      };
    }),
});
