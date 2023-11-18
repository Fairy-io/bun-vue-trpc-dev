import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({
    req: _req,
    res: _res,
}: trpcExpress.CreateExpressContextOptions) => ({});
