<script setup>
import AppFooter from './AppFooter.vue';
import AppTopbar from './AppTopbar.vue';
</script>
<template>
    <div class="relative">
        <AppTopbar />
        <slot> </slot>
        <AppFooter />
    </div>
</template>

<style scoped>
@import '~/assets/css/tailwind.css';
</style>
