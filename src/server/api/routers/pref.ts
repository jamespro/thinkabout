import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const prefRouter = createTRPCRouter({
  getPref: protectedProcedure.query(async ({ ctx }) => {
    try {
      let pref = await ctx.prisma.pref.findUnique({
        where: { userId: ctx.session?.user.id },
      });

      if (!pref) {
        // Create a new record with empty values
        pref = await ctx.prisma.pref.create({
          data: {
            userId: ctx.session?.user.id,
            currentDeck: "",
            defaultDeck: "",
            pref01: false,
            pref02: false,
            pref03: false,
            pref04: false,
            pref05: false,
            prefa: "",
            prefb: "",
            prefc: "",
            prefd: "",
            prefe: "",
          },
        });
      }
      console.log("new userPref created");
      return pref;
    } catch (error) {
      console.error("Error fetching or creating pref:", error);
      throw error;
    }
  }),
  //FIXME: WHY ARE DECK-RELATED PROCEDURES IN PREF? WAS IT ONLY FOR REFERENCE?
  /*
  getCurrentDeck: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.pref.findUnique({
        where: {
          userId: input.userId,
        },
        select: {
          currentDeck: true,
        },
      });
    }),
*/
  updateCurrentDeck: protectedProcedure
    .input(z.object({ currentDeck: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.pref.update({
        where: {
          userId: ctx.session?.user.id,
        },
        data: {
          currentDeck: input.currentDeck,
        },
      });
    }),
  /*
  getDefaultDeck: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.pref.findUnique({
        where: {
          userId: input.userId,
        },
        select: {
          defaultDeck: true,
        },
      });
    }),
*/
  updateDefaultDeck: protectedProcedure
    .input(z.object({ defaultDeck: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.pref.update({
        where: {
          userId: ctx.session?.user.id,
        },
        data: {
          defaultDeck: input.defaultDeck,
        },
      });
    }),

  //FIXME: Do you need "create" or "createPref"?
  /*
  create: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.pref.create({
        data: {
          user: { connect: { id: input.userId } },
        },
      });
    }),

  createPref: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        currentDeck: z.string(),
        defaultDeck: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.pref.create({
        data: {
          userId: input.userId,
          currentDeck: input.currentDeck,
          defaultDeck: input.defaultDeck,
        },
      });
    }),
*/
  //probably shouldn't be able to delete your prefs
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.pref.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
