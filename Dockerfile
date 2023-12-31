FROM ubuntu:20.04 as bun

WORKDIR /app

RUN apt update
RUN apt install curl -y
RUN apt install unzip -y

RUN curl -fsSL https://bun.sh/install | bash

RUN cp -r ~/.bun/bin/* .
COPY ./deploy.sh ./deploy
RUN chmod +x ./deploy

FROM ubuntu:20.04 as dependencies

WORKDIR /app

COPY --from=bun /app /usr/local/sbin

COPY package.json .
COPY bun.lockb .

RUN mkdir app
RUN bun install

COPY . .
RUN bun add zod

RUN bun test

RUN rm package.json
RUN rm bun.lockb

CMD sleep infinity

FROM node:18

WORKDIR /app

COPY --from=dependencies /usr/local/sbin /usr/local/sbin

RUN bun x playwright install
RUN bun x playwright install-deps

COPY --from=dependencies /app .

CMD sleep infinity
