<script setup lang="ts">
defineProps<{
    /**
     * message
     */
    msg: string;
}>();
</script>

<template>
    <h1>{{ msg }}</h1>
</template>

<style scoped></style>
