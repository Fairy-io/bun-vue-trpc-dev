import {
    inferAsyncReturnType,
    initTRPC,
} from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({
    req: _req,
    res: _res,
}: trpcExpress.CreateExpressContextOptions) => ({});

type Context = inferAsyncReturnType<typeof createContext>;

export const trpc = initTRPC.context<Context>().create();
