import {
    createTRPCProxyClient,
    httpBatchLink,
} from '@trpc/client';
import type { Router } from 'backend';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const client = createTRPCProxyClient<Router>({
    links: [
        httpBatchLink({
            url: `${backendUrl || ''}/trpc`,
        }),
    ],
});

export type Client = typeof client;

export const mockedClient: Client = {
    helloWorld: {
        query: async (_input) => {
            return {
                message: 'Hello World from Mocked Client',
            };
        },
    },
};
