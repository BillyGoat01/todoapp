import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Todo } from "../core/todo"
import { PG } from 'core/pg';
import { Row } from 'core/pg';


const t = initTRPC.create();

const appRouter = t.router({
  Todos: t.procedure
    .query(() => {
      // console.log(Todo.list())
      return Todo.list()
    }),
    getATask: t.procedure
    .input(
      z.object({
        todoid: z.string()
      })
  ).query(({input}) =>{
    return Todo.getatask(input.todoid)
  }),
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
    deleteTask: t.procedure
    .input(
      z.object({
        todoid: z.string(),
      })
    ).mutation(({input}) => {
      return Todo.deletetask(input.todoid)
    }),
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





// greeting: t.procedure
// .input(
//     z.object({
//       name:  z.string(),
//       })
//   )
//   .query((req) => {
//     req.input
//   return { 
//       text: `Hello ${req.input?.name ?? 'world'}`
//   };
// }),
export type AppRouter = typeof appRouter;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
})
// greetings: t.procedure
// .input(
  //   z.object({
    //     names: z.array(z.string()),
    //   })
    // )
    // .query(({input}) => {
      //   return {
        //     name:
        //   }
        // const createContext = ({
        //   event,
        //   context,
        // }: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({
        //   headers: {
        //     'Access-Control-Allow-Origin': 'http://localhost:3000',
        //     'Access-Control-Allow-Credentials': true,
        //   },
        // }) // no context
// })



