import {
    inferAsyncReturnType,
    initTRPC,
} from '@trpc/server';
import { createContext } from './context';

type Context = inferAsyncReturnType<typeof createContext>;

export const trpc = initTRPC.context<Context>().create();
export { createContext };
