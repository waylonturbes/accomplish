/**
 *
 * This is an example router, you can delete this file and then update
 * `../pages/api/trpc/[trpc].tsx`.
 */
import { router, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";

/**
 * Default selector for Task.
 * It's important to always explicitly say which fields you want to return in
 * order to not leak extra information.
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultTaskSelect = Prisma.validator<Prisma.TaskSelect>()({
  id: true,
  title: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
  isCompleted: true,
  date: true,
  month: true,
  year: true,
  emoji: true,
  checklist: true,
});

export const taskRouter = router({
  getTasksByYearMonth: publicProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { month, year } = input;
      const task = await prisma.task.findMany({
        where: {
          month,
          year,
        },
        select: defaultTaskSelect,
      });
      if (!task) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No tasks found within ${month}, ${year}`,
        });
      }
      return task;
    }),
  createTask: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        userId: z.string(),
        date: z.number(),
        month: z.number(),
        year: z.number(),
        emoji: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const task = await prisma.task.create({
        data: input,
        select: defaultTaskSelect,
      });
      return task;
    }),
  updateTask: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        userId: z.string(),
        date: z.number(),
        month: z.number(),
        year: z.number(),
        emoji: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const task = await prisma.task.update({
        data: {
          title: input.title,
          description: input.description,
          date: input.date,
          month: input.month,
          year: input.year,
          userId: input.userId,
          emoji: input.emoji,
        },
        where: {
          id: input.id,
        },
        select: defaultTaskSelect,
      });
      return task;
    }),
  deleteTask: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await prisma.task.delete({
      where: {
        id: input,
      },
    });
  }),
});
