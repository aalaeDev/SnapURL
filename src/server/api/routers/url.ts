import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const urlRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        originalUrl: z.string(),
        urlCode: z.string(),
        shortUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.url.create({
        data: {
          originalUrl: input.originalUrl,
          urlCode: input.urlCode,
          shortUrl: input.shortUrl,
          clicks: 0,
        },
        select: {
          shortUrl: true,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.url.findMany();
  }),
  getByUrlCode: publicProcedure
    .input(
      z.object({
        urlCode: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.url.findUnique({
        where: {
          urlCode: input.urlCode,
        },
        include: {
          visitors: {
            orderBy: {
              visitedAt: "desc",
            },
          },
        },
      });
    }),
});
