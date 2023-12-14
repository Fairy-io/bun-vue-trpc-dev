import { expect, it, describe } from 'bun:test';
import { router } from '../src/trpc/router';

describe('helloWorld', () => {
    it('returns Hello World if input is not defined', async () => {
        const caller = router.createCaller({});

        const result = await caller.helloWorld();

        expect(result).toEqual({ message: 'Hello World' });
    });

    it('returns Hello Test if input is Test', async () => {
        const caller = router.createCaller({});

        const result = await caller.helloWorld('Test');

        expect(result).toEqual({ message: 'Hello Test' });
    });
});
