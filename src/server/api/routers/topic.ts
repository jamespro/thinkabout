import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
    });
  }),

  getDefault: protectedProcedure.query(({ ctx }) => {
    //TODO: replace this with "find the default topic for this user"
    //TODO: need User model to have a "default" field? as a "setting" -- or a new model "settings" and there is only one settings record for each user
    //TODO: need a way for the user to select which topic is their default
    /*NOTE: if there is no default, THEN findFirst
    - could be a case where the user hasn't set up any topics yet, so maybe return a message? like set up a default or just nothing
    - when creating the first topic, also make it the default? or just let the findFirst take care of that. Also, what if you delete the default topic, we don't want to have to add logic for setting a new one, so just use findFirst instead of setting defaults for users.
    */
    return ctx.prisma.topic.findFirst({
      where: {
        userId: ctx.session?.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.topic.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.topic.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
