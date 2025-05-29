<script setup lang="ts">
import PostForm from '@/pages/Home/components/PostForm.vue';
import PostsFeed from '@/pages/Home/components/PostsFeed.vue';

</script>

<style scoped lang="scss">

</style>

<template>
    <v-row>
      <v-col>
        <PostForm />

        <PostsFeed />        
      </v-col>
    </v-row>
</template>
