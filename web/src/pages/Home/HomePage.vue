<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Post } from '@/models/Post';
import { PostAPIManager } from '@/services/PostAPIManager';
import LeftColumn from '@/pages/Home/components/LeftColumn.vue';
import PostForm from '@/pages/Home/components/PostForm.vue';
import PostList from '@/pages/Home/components/PostList.vue';
import Overlay from "@/components/Overlay.vue";

const posts = ref<Post[]>([]);
const isLoading = ref<boolean>(false)

onMounted(async () => {
  loadPosts()
});

/**
 * 
 */
function loadPosts() {
  isLoading.value = true;

  PostAPIManager.fetchLatestPosts(50)
    .then((result: Post[]) => {
      posts.value = result;
    })
    .catch(() => {
    })
    .then((result: Post[]) => {
      isLoading.value = false;
    })
}

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
        <PostForm @created="loadPosts()" />

        <div>
          <Overlay :is-loading="isLoading" />
          <PostList :posts="posts" />
        </div>
        
      </v-col>
    </v-row>
</template>
