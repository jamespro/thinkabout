import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const deckRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.deck.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
    });
  }),

  //This should be going to the user PREFS to get the currentDeck, and maybe currentDeck goes into useContext or at least at top level
  getDefaultDeckId: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.deck.findFirst({
      where: {
        userId: ctx.session?.user.id,
      },
      select: {
        id: true,
      },
    });
  }),

  getDeckData: protectedProcedure
    .input(z.object({ deckId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.deck.findUnique({
        where: {
          id: input.deckId,
        },
      });
    }),

  getDefaultDeckData: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.deck.findFirst({
      where: {
        userId: ctx.session?.user.id,
      },
    });
  }),

  getDefault: protectedProcedure.query(({ ctx }) => {
    //TODO: replace this with "find the default deck for this user"
    //TODO: need User model to have a "default" field? as a "setting" -- or a new model "settings" and there is only one settings record for each user
    //TODO: need a way for the user to select which deck is their default
    /*NOTE: if there is no default, THEN findFirst
    - could be a case where the user hasn't set up any decks yet, so maybe return a message? like set up a default or just nothing
    - when creating the first deck, also make it the default? or just let the findFirst take care of that. Also, what if you delete the default deck, we don't want to have to add logic for setting a new one, so just use findFirst instead of setting defaults for users.
    */
    return ctx.prisma.deck.findFirst({
      where: {
        userId: ctx.session?.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.deck.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.deck.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
