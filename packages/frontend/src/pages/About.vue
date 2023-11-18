<script setup lang="ts">
import { useRoute } from 'vue-router';

defineProps<{ name: string }>();

const route = useRoute();
const query: { n?: string } = route.query;
</script>

<template>
    This is page about {{ name }}. Hello,
    {{ query.n?.toUpperCase() }}
</template>
