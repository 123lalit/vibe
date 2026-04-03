import 'server-only'; // <-- ensure this file cannot be imported from the client
 
// server.ts mein superjson import ki zaroorat nahi — transformer init.ts mein already set hai router pe.

import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
// import { createTRPCClient, httpLink } from '@trpc/client';
import { cache } from 'react';
import { createTRPCContext } from './init';
import { makeQueryClient } from './query-client';
import { appRouter } from './routers/_app';
import type { AppRouter } from './routers/_app';
 

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
 
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

/*---fetching data from a server component using tRPC using a caller---*/
// ...
export const caller = appRouter.createCaller(createTRPCContext);