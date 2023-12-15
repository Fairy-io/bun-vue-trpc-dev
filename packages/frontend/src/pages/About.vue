<script setup lang="ts">
defineProps<{
    /**
     * route param: /about/:name
     */
    name: string;
}>();
</script>

<template>
    <div data-testid="about-content">
        This is page about {{ name }}
    </div>
</template>
