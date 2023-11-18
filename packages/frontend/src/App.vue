<script setup lang="ts">
import { provide } from 'vue';
import { client } from './trpc';

provide('trpc-client', client);
</script>

<template>
    <Suspense>
        <router-view />
    </Suspense>
</template>

<style scoped></style>
