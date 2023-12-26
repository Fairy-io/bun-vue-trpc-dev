import { it, expect, describe } from 'bun:test';
import { deploy } from '../src/deploy';
import {
    GithubMock,
    defaultDeployment,
    jsonDeployment,
} from './helper';

describe('deploy', () => {
    it('updates or creates configutation in remote repository', async () => {
        const githubMock = GithubMock({
            auth: { token: '123' },
            owner: '123',
            repo: '123',
            branch: 'main',
            path: '123',
            message:
                'creating deployment: 123, for image: 123',
            content: defaultDeployment,
            options: {},
        });

        await deploy(githubMock, [
            'name=123',
            'owner=123',
            'token=123',
            'repo=123',
            'path=123',
            'image=123',
        ]);
    });

    it('uses custom template', async () => {
        const githubMock = GithubMock({
            auth: { token: '123' },
            owner: '123',
            repo: '123',
            branch: 'main',
            path: '123',
            message:
                'creating deployment: 123, for image: 123',
            content: jsonDeployment,
            options: {},
        });

        await deploy(githubMock, [
            'name=123',
            'owner=123',
            'token=123',
            'repo=123',
            'path=123',
            'image=123',
            'template=ewogICJuYW1lIjogIiRuYW1lIiwKICAiaW1hZ2UiOiAiJGltYWdlIgp9Cg==',
        ]);
    });

    it('trims keys and values', async () => {
        const githubMock = GithubMock({
            auth: { token: '123' },
            owner: '123',
            repo: '123',
            branch: 'main',
            path: '123',
            message:
                'creating deployment: 123, for image: 123',
            content: jsonDeployment,
            options: {},
        });

        await deploy(githubMock, [
            'name=   123',
            'owner=123    ',
            '   token=123',
            'repo = 123',
            'path      =123',
            'image=123',
            'template=ewogICJuYW1lIjogIiRuYW1lIiwKICAiaW1hZ2UiOiAiJGltYWdlIgp9Cg==',
        ]);
    });

    it('throws validation error if no arguments are provided', () => {
        const testFn = async () => {
            const githubMock = GithubMock();
            await deploy(githubMock, []);
        };

        const errorMessage = [
            '',
            'name option is required',
            'owner option is required',
            'repo option is required',
            'token option is required',
            'path option is required',
            'image option is required',
        ].join('\n');

        expect(testFn).toThrow(errorMessage);
    });

    it('throws validation error if not all arguments are provided', () => {
        const testFn = async () => {
            const githubMock = GithubMock();
            await deploy(githubMock, [
                'name=123',
                'token=123',
                'image=123',
            ]);
        };

        const errorMessage = [
            '',
            'owner option is required',
            'repo option is required',
            'path option is required',
        ].join('\n');

        expect(testFn).toThrow(errorMessage);
    });

    it('throws validation error if arguments are in incorrect format', () => {
        const testFn = async () => {
            const githubMock = GithubMock();
            await deploy(githubMock, [
                '123',
                '123',
                '123',
                '123',
                '123',
                '123',
            ]);
        };

        const errorMessage = [
            '',
            'name option is required',
            'owner option is required',
            'repo option is required',
            'token option is required',
            'path option is required',
            'image option is required',
        ].join('\n');

        expect(testFn).toThrow(errorMessage);
    });
});
