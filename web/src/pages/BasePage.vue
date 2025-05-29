<script setup lang="ts">
import LeftColumn from '@/pages/Home/components/LeftColumn.vue';

</script>

<style scoped lang="scss">

</style>

<template>
    <v-row>
      <v-col cols="3">
        <LeftColumn />
      </v-col>

      <!-- Latest Posts -->
      <v-col cols="9">
        <router-view />
      </v-col>
    </v-row>
    
</template>
