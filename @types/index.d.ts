declare module 'github-api' {
    class Repository {
        getSha(
            branch: string,
            path: string,
            cb: (error: any, data: any) => Promise<void>,
        );

        writeFile(
            branch: string,
            path: string,
            content: string,
            message: string,
            options: {},
            cb: (error: any, data: any) => Promise<void>,
        );
    }

    export default class Github {
        constructor(auth: { token: string });

        getRepo(owner: string, repo: string): Repository;
    }
}
