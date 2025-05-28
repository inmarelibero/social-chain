<script setup lang="ts">
import LeftColumn from '@/pages/Home/components/LeftColumn.vue';
import PostForm from '@/pages/Home/components/PostForm.vue';
import PostsFeed from '@/pages/Home/components/PostsFeed.vue';

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
        <PostForm />

        <PostsFeed />        
      </v-col>
    </v-row>
</template>
