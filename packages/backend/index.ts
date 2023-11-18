import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from './src/trpc';
import { router } from './src/trpc/router';

export type Router = typeof router;

export const trpcMiddleware =
    trpcExpress.createExpressMiddleware({
        router,
        createContext,
    });

export { validation as helloWorldValidation } from './src/validations/helloWorld';
