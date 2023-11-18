<script setup lang="ts">
import { inject } from 'vue';
import { Client } from '../trpc';
import HelloWorld from '../components/HelloWorld.vue';

const client = inject<Client>('trpc-client');

const { message } =
    (await client?.helloWorld.query('message')) || {};
</script>

<template>
    <img
        src="../assets/vite.svg"
        class="logo"
        alt="Vite logo"
    />
    <img
        src="../assets/vue.svg"
        class="logo vue"
        alt="Vue logo"
    />
    <HelloWorld :msg="message" />
</template>

<style scoped></style>
