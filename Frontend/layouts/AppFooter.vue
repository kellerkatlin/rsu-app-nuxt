<script setup>

import { ref } from 'vue';

const logoUrl = ref('/layout/images/rsu.jpg');
</script>

<template>
    <div class="layout-footer">
        <img :src="logoUrl" alt="Logo" height="20" class="mr-2" />
        by
        <span class="ml-2 font-medium">Keller Katlin</span>
    </div>
</template>
<style lang="scss" scoped>
@import '@/assets/layout/styles/theme/lara-light-indigo/theme.css';
</style>
