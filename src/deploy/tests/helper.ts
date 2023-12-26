import { expect } from 'bun:test';

type Expects = {
    auth: { token: string };
    owner: string;
    repo: string;
    branch: string;
    path: string;
    content: string;
    message: string;
    options: object;
};

const defaultExpects: Expects = {
    auth: { token: '' },
    owner: '',
    repo: '',
    branch: '',
    path: '',
    content: '',
    message: '',
    options: {},
};

export const GithubMock = (
    expects: Expects = defaultExpects,
) => {
    class RepositoryMock {
        constructor(owner: string, repo: string) {
            expect(owner).toBe(expects.owner);
            expect(repo).toBe(expects.repo);
        }

        getSha(
            _branch: string,
            _path: string,
            _cb: (error: any, data: any) => Promise<void>,
        ) {}

        async writeFile(
            branch: string,
            path: string,
            content: string,
            message: string,
            options: {},
            cb: (error: any, data: any) => Promise<void>,
        ) {
            try {
                expect(branch).toBe(expects.branch);
                expect(path).toBe(expects.path);
                expect(content).toBe(expects.content);
                expect(message).toBe(expects.message);
                expect(options).toEqual(expects.options);
            } catch (error) {
                throw error;
            } finally {
                await cb(null, {});
            }
        }
    }

    return class GithubMock {
        constructor(auth: { token: any }) {
            expect(auth).toEqual(expects.auth);
        }

        getRepo(owner: string, repo: string) {
            return new RepositoryMock(owner, repo);
        }
    };
};

export const defaultDeployment =
    `
apiVersion: apps/v1
kind: Deployment
metadata:
    name: 123
spec:
    selector:
        matchLabels:
            app: 123
    template:
        metadata:
            labels:
                app: 123
        spec:
            containers:
                - name: 123
                  image: 123
                  ports:
                      - name: http
                        containerPort: 3000
                        protocol: TCP`.trim() + '\n';

export const jsonDeployment =
    `
{
  "name": "123",
  "image": "123"
}`.trim() + '\n';
