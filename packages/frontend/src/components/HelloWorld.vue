<script setup lang="ts">
defineProps<{
    /**
     * message
     */
    msg: string;
}>();
</script>

<template>
    <h1 data-testid="hello-world-content">{{ msg }}</h1>
</template>

<style scoped></style>
