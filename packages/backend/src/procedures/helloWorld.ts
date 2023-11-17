import { trpc } from '../trpc';
import { validation } from '../validations/helloWorld';

export const helloWorld = trpc.procedure
    .input(validation)
    .query(async (opts) => {
        const name: string = opts.input || 'World';

        return { message: `Hello ${name}` };
    });
