import { trpc } from '.';

import { helloWorld } from '../procedures/helloWorld';

export const router = trpc.router({
    helloWorld,
});
