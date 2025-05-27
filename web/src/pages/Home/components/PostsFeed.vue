<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue';
import { Post } from '@/models/Post';
import { PostAPIManager } from '@/services/PostAPIManager';
import Posts from '@/pages/Home/components/Posts.vue';
import Overlay from "@/components/Overlay.vue";
import EventBus from "type-safe-event-bus";

const posts = ref<Post[]>([]);
const isLoading = ref<boolean>(false)

onMounted(async () => {
  loadInitialPosts()
});

EventBus.$on("post_created", (event) => {
  console.log('Post created event received:', event);
  loadLaterPosts()
});

/**
 * 
 * @param input 
 */
function mergePosts(input: Post[]) {
  
  if (input && input.length > 0) {    
    let output: Post[] = [...input, ...toRaw(posts.value)];

    // remove duplicates by post.id
    for (let i = 0; i < input.length; i++) {
      const post = input[i];

      const existingIndex = posts.value.findIndex(existingPost => existingPost.id === post.id);

      if (existingIndex !== -1) {
        output = output.filter(item => item.id !== post.id)
        output = [post, ...output]
      }
    }

    // sort
    output.sort((a, b) => b.id - a.id);

    posts.value = [...output];
  }
}

/** */
function getLowestPostId(): number {
  if (posts.value.length > 0) {
    return posts.value[posts.value.length - 1].id;
  }

  return 0;
}

/** */
function getHighestPostId(): number {
  if (posts.value.length > 0) {
    return posts.value[0].id;
  }

  return 0;
}

/**
 * 
 */
function loadInitialPosts() {
  isLoading.value = true;

  PostAPIManager.fetchPostsCount()
    .then((count: number) => {
      const from = Math.max(0, count - PostAPIManager.ITEMS_PER_PAGE_POST) + 1

      PostAPIManager.fetchLatestPosts(from)
        .then((result: Post[]) => {
          mergePosts(result);
        })
        .catch(() => {
        })
        .then((result: Post[]) => {
          isLoading.value = false;
        })
    })
}

/**
 * 
 */
function loadPreviousPosts() {
  isLoading.value = true;

  const from = Math.max(0, getLowestPostId() - PostAPIManager.ITEMS_PER_PAGE_POST) + 1

  PostAPIManager.fetchLatestPosts(from)
    .then((result: Post[]) => {
      mergePosts(result);
    })
    .catch(() => {
    })
    .then((result: Post[]) => {
      isLoading.value = false;
  })
}

/**
 * 
 */
function loadLaterPosts() {
  isLoading.value = true;

  const from = Math.max(0, getHighestPostId()) + 1

  PostAPIManager.fetchLatestPosts(from)
    .then((result: Post[]) => {
      mergePosts(result);
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
      <v-col>
        <div>
          <Overlay :is-loading="isLoading" />

          <div class="mb-4" v-if="posts.length > 0">
            <v-btn
              color="secondary"
              size="small"
              @click="loadLaterPosts()"
            >
              Load more...
            </v-btn>
          </div>

          <Posts :posts="posts" />

          <div class="mt-4" v-if="posts.length > 0">
            <v-btn
              color="secondary"
              size="small"
              @click="loadPreviousPosts()"
            >
              Load more...
            </v-btn>
          </div>
        </div>
        
      </v-col>
    </v-row>
</template>
