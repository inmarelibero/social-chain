<script setup lang="ts">

import Loading from 'vue-loading-overlay';

/**
 * 
 */
const props = defineProps<{
    // the ref() to control the loading state
    isLoading: false,
}>()

</script>

<style scoped lang="scss">
</style>

<template>
    <loading v-model:active="props.isLoading" :is-full-page="false"/>
</template>
