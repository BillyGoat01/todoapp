import {  APIGatewayProxyEventV2 } from "aws-lambda";

import { CreateAWSLambdaContextOptions, awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

const appRouter = t.router({
  greeting: t.procedure
  .input(
      z.object({
        name:  z.string(),
        })
    )
    .query((req) => {
      req.input
    return { 
        text: `Hello ${req.input?.name ?? 'world'}`
    };
  }),
});

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



