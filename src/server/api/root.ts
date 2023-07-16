import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { deckRouter } from "~/server/api/routers/deck";
import { cardRouter } from "~/server/api/routers/card";
import { prefRouter } from "~/server/api/routers/pref";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  deck: deckRouter,
  card: cardRouter,
  pref: prefRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
