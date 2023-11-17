import * as trpcExpress from '@trpc/server/adapters/express';
import { trpc, createContext } from './src/trpc';

import { helloWorld } from './src/procedures/helloWorld';

const router = trpc.router({
    helloWorld,
});

export type Router = typeof router;

export const trpcMiddleware =
    trpcExpress.createExpressMiddleware({
        router,
        createContext,
    });

export { validation as helloWorldValidation } from './src/validations/helloWorld';
