import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const cardRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ deckId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.card.findMany({
        where: {
          deckId: input.deckId,
        },
      });
    }),
  /*
  // previous attempt to get a random row with Postgres raw query
  //  import type { Card } from "@prisma/client";
      const randomCard = await ctx.prisma.$queryRaw<Card[]>`
        SELECT *
        FROM Card
        WHERE deckId = ${input.deckId}
        ORDER BY random()
        LIMIT 1;
      `;
      return randomCard[0] as Card;
*/
  //TODO: could have this find a random one?
  getOne: protectedProcedure
    .input(z.object({ deckId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.card.findFirst({
        where: {
          deckId: input.deckId,
        },
      });
    }),

  getCount: protectedProcedure
    .input(z.object({ deckId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.card.count({
        where: {
          deckId: input.deckId,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), deckId: z.string() })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.card.create({
        data: {
          title: input.title,
          content: input.content,
          deckId: input.deckId,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.card.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
