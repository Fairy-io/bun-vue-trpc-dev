<script setup lang="ts">
// import { useRoute } from 'vue-router';

defineProps<{
    /**
     * route param: /about/:name
     */
    name: string;
}>();

// this query does not work good in storybook
// const route = useRoute();
// const query: { n?: string } = route.query;
</script>

<template>This is page about {{ name }}</template>
