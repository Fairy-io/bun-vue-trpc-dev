# bun-vue-trpc-dev

## What is it?

`bun-vue-trpc-dev` comprises a collection of Docker images designed to enhance development, testing, building, and deployment workflows. These images come equipped with preinstalled dependencies and a preconfigured environment to streamline the mentioned processes. Notable components provided out of the box are:

-   [Bun](https://bun.sh) - JavaScript runtime, backend test runner and package manager, is included in the environment for test, build, and deploy processes (CI/CD). However, for the local development environment, please note that Bun needs to be installed separately.
-   [Vue3](https://vuejs.org) and [Vite](https://vitejs.dev) - Frontend framework.
-   [tRPC](https://trpc.io) - Backend framework.
-   [Storybook](https://storybook.js.org) - Components preview.
-   [Storybook Test runner](https://storybook.js.org/docs/writing-tests/test-runner) - Frontend testing for CI/CD.

### Images

Two images are currently included:

-   [bun-vue-trpc-dev-utils](https://hub.docker.com/repository/docker/massfice/bun-vue-trpc-dev-utils/general)
    -   Supports both arm64 and amd64 versions for all releases (tags).
    -   For amd64 versions, tags are suffixed with `-amd64`. For example, `massfice/bun-vue-trpc-dev-utils:1.0.0` is the arm64 version, while `massfice/bun-vue-trpc-dev-utils:1.0.0-amd64` is the amd64 version.
-   [bun-vue-trpc-dev-ci](https://hub.docker.com/repository/docker/massfice/bun-vue-trpc-dev-ci/general)
    -   Supports arm64 versions for all releases (tags).
    -   For amd64 versions, support starts from version 2.2.0. Tags for amd64 versions are suffixed with `-amd64`. For example, `massfice/bun-vue-trpc-dev-ci:2.2.0` is the arm64 version, and `massfice/bun-vue-trpc-dev-ci:2.2.0-amd64` is the amd64 version.

## How to use it?

### Development

The `bun-vue-trpc-dev-utils` image is intended for use in development, providing a seamless setup for the development environment.

To get started, create two files:

```typescript
// app/backend/index.ts
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from './src/trpc';
import { router } from './src/trpc/router';

// Router type should be exported
export type Router = typeof router;

// trcpMiddleware const should be exported
export const trpcMiddleware =
    trpcExpress.createExpressMiddleware({
        router,
        createContext,
    });
```

```typescript
// app/frontend/index.ts
import { createWebHistory, createRouter } from 'vue-router';
import App from './src/App.vue';
import Home from './src/pages/Home.vue';
import About from './src/pages/About.vue';
import './src/style.css';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/about/:name',
            name: 'About',
            component: About,
            props: true,
        },
    ],
});

// App and router const should be exported
export { App, router };
```

Also, include `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        />
        <title>Vite + Vue + TS</title>
    </head>
    <body>
        <div id="app"></div>
        <script type="module" src="/src/main.ts"></script>
    </body>
</html>
```

Then, execute the following command:

```bash
docker run -d --name bvtt massfice/bun-vue-trpc-dev-utils:2.0.0 && docker cp bvtt:/app/. . && docker stop bvtt && docker rm bvtt && bun install
```

This command runs a Docker container based on the specified image, copies files from the running container, stops and removes the container. The `bun install` command is used to install backend and frontend dependencies quickly.

### Test and Build

For CI/CD environments, leverage `bun-vue-trpc-dev-ci` to facilitate testing and building processes. It is recommended to carry out testing and building operations directly within the `Dockerfile`:

```docker
FROM massfice/bun-vue-trpc-dev-ci:2.0.0 as test_and_build

WORKDIR /app

COPY package.json .
COPY bun.lockb .
COPY ./app/ ./app/

RUN bun install
RUN bun tests

COPY index.html index.html
COPY ./public/ ./public/

RUN bun server:build
RUN bun vue:build

FROM ubuntu:20.04

WORKDIR /app

COPY --from=test_and_build /usr/local/sbin /usr/local/sbin
COPY --from=test_and_build /app/dist/ ./public/.
COPY --from=test_and_build /app/server.js ./server.js

EXPOSE 3000

CMD bun server.js

```

The `bun-vue-trpc-dev-ci` image provides additional dependencies essential for the Storybook test runner (`playwright` related). While this image is larger and not intended for development processes, the utilization of Docker layer caching and image caching on CI/CD platforms ensures a swift testing and building process.

### Deploy

The deployment step utilizes the `bun-vue-trpc-dev-utils` image as a single CI/CD step. The deploy script adheres to [GitOps](https://about.gitlab.com/topics/gitops) principles, storing the deployment in [GitHub](https://github.com) rather than directly deploying the image. This approach ensures versioned deployments that can be seamlessly integrated with tools like `Terraform` or `ArgoCD`.

Here's an example configuration for `Google Cloud Build` employing the deploy script provided by the `utils` image:

```yaml
steps:
    - name: 'massfice/bun-vue-trpc-dev-utils:2.0.0-amd64'
      args:
          - '-c'
          - >-
              deploy name=name owner=owner repo=infra_repo token=$$GITHUB_TOKEN
              template=ewogICAgIm5hbWUiOiAiJG5hbWUiLAogICAgImltYWdlIjogIiRpbWFnZSIKfQo=
              image=docker_image_to_deploy
              path=infra_repo_path
      id: Deploy
      entrypoint: bash
      secretEnv:
          - GITHUB_TOKEN
```

(Google Cloud Build uses `-amd64` images).

Deploy script takes following arguments:

-   `name` - name of deployment **(required)**
-   `owner` - GitHub owner, which can be a username or organization name **(required)**
-   `repo` - the name of the GitOps repository where the deployment will be stored; it must belong to the specified `owner` **(required)**
-   `image` - the image to be deployed **(required)**
-   `path` - the deployment location (path in the infra repository) **(required)**
-   `token` - GitHub token for authorization **(required)**
-   `template` - a base64-encoded template containing variables `$name` (for deployment name) and `$image` (for image) _(optional)_

If template is not provided, default will be used:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: $name
spec:
    selector:
        matchLabels:
            app: $name
    template:
        metadata:
            labels:
                app: $name
        spec:
            containers:
                - name: $name
                  image: $image
                  ports:
                      - name: http
                        containerPort: 3000
                        protocol: TCP
```

## BUN-VUE-TRPC-TEMPLATE

The [bun-vue-trpc-template](https://github.com/Fairy-io/bun-vue-trpc-template) fully leverages these Docker images. Check it out!

## Changelog

### Version 1.0.0

#### New Features

-   Incorporated `bun`
-   Integrated `tRPC` support
-   Added support for `Vue3` + `Vite`
-   Included `Storybook`
-   Introduced the `./src/deploy.ts` script

### Version 1.0.1

#### Enhancements

-   Added the `deploy.sh` script, invoking `./src/deploy.ts` for increased project flexibility

### Version 2.0.0

#### Major Adjustments

-   Relocated `./src/deploy.ts` to`./src/deploy/src/index.ts`
-   Transformed the `template` parameter in the deploy script from a file path to a base64 encoded template
-   Moved the `deploy` script to `/usr/local/sbin`, requiring the use of `deploy` instead of `./deploy.sh` (considering `/usr/local/sbin` is now included in `$PATH`)

#### Enhancements

-   Refactored code in the deploy script

### Version 2.1.0

#### Enhancements

-   `PORT` environment variable for trpc server is now supported

### Version 2.2.0

#### Enhancements

-   Modified `cloudbuild.yaml` to build `amd64` ci image versions
