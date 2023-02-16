import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../services/functions/lambda'
import { httpBatchLink } from '@trpc/client';





export const trpc = createTRPCReact<AppRouter>();