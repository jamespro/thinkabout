import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const noteRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findMany({
        where: {
          topicId: input.topicId,
        },
      });
    }),
  /*
  // previous attempt to get a random row with Postgres raw query
  //  import type { Note } from "@prisma/client";
      const randomNote = await ctx.prisma.$queryRaw<Note[]>`
        SELECT *
        FROM Note
        WHERE topicId = ${input.topicId}
        ORDER BY random()
        LIMIT 1;
      `;
      return randomNote[0] as Note;
*/
  //TODO: could have this find a random one?
  getOne: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findFirst({
        where: {
          topicId: input.topicId,
        },
      });
    }),

  getCount: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.count({
        where: {
          topicId: input.topicId,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), topicId: z.string() })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
          topicId: input.topicId,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
