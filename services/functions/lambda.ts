import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Todo } from "../core/todo"
import { PG } from 'core/pg';
import { Row } from 'core/pg';


const t = initTRPC.create();

const appRouter = t.router({
  //route that get all tasks
  Todos: t.procedure
    .query(() => {
      return Todo.list()
    }),
    //route gets a singular task
    getATask: t.procedure
    .input(
      z.object({
        todoid: z.string()
      })
  ).query(({input}) =>{
    return Todo.getatask(input.todoid)
  }),
  // Route creates a task
  postTask: t.procedure
    .input(
      z.object({
        task: z.string(),
        completed_by: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(({ input }) => {
      return Todo.create(input.task, input.completed_by, input.completed)
    }),
    // Route deletes task
    deleteTask: t.procedure
    .input(
      z.object({
        todoid: z.string(),
      })
    ).mutation(({input}) => {
      return Todo.deletetask(input.todoid)
    }),
    // sets task to true (comleted) or false (not completed)
    completedTask: t.procedure
    .input(
      z.object({
        todoid: z.string(),
        completed: z.boolean()
      })
    ).mutation(({input}) => {
      return Todo.complete(input.todoid, input.completed )
    })
})


export type AppRouter = typeof appRouter;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
})




