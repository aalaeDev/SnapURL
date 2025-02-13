import { urlRouter } from "~/server/api/routers/url";
import { createTRPCRouter } from "~/server/api/trpc";
import { visitorRouter } from "./routers/visitor";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  url: urlRouter,
  visitor: visitorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
