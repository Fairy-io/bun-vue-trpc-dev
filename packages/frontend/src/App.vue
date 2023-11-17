<script setup lang="ts">
import {
    createTRPCProxyClient,
    httpBatchLink,
} from '@trpc/client';
import HelloWorld from './components/HelloWorld.vue';
import type { Router } from 'backend';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

console.log({ backendUrl });

const client = createTRPCProxyClient<Router>({
    links: [
        httpBatchLink({
            url: `${backendUrl}/trpc`,
        }),
    ],
});

// console.log({ abc: 1 });

const { message } = await client.helloWorld.query('abc');

console.log(message);
</script>

<template>
    <img
        src="./assets/vite.svg"
        class="logo"
        alt="Vite logo"
    />
    <img
        src="./assets/vue.svg"
        class="logo vue"
        alt="Vue logo"
    />
    <HelloWorld msg="Vite + Vue" />
</template>

<style scoped></style>
