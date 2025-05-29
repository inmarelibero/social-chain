<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue';
import { PostAPIManager } from '@/services/PostAPIManager';
import { useRoute } from 'vue-router';
import { Post } from '@/models/Post';
import Overlay from "@/components/Overlay.vue";

const route = useRoute();

const isLoading = ref<boolean>(false)
const id = ref<number | null>(null);
const post = ref<Post | null>(null);

onMounted(async () => {
  id.value = parseInt(route.params.id);
  loadPost(id.value)
});

/**
 * 
 */
const loadPost = async (id: number) => {
  isLoading.value = true;

  PostAPIManager.fetchPost(id)
    .then((result: Post) => {
      post.value = result
    })
    .catch((error) => {
      console.error('Error loading post:', error);
    })
    .then((result: Post[]) => {
      isLoading.value = false;
    });
}
</script>

<style scoped lang="scss">

@use '@/styles/variables' as *;

.post {
  background-color: #fff;
  padding: $defaultPadding;
  border-radius: $defaultBorderRadius;
  border: $defaultBorder;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

<template>
  <v-row>
      <v-col>
        <v-btn
          :to="{ name: 'home'}"
          color="primary"
          size="small"
          variant="flat"
        >
          <v-icon icon="mdi-chevron-left" />
          BACK
        </v-btn>
      </v-col>
    </v-row>
            
    <v-row>
      <v-col>
        <Overlay :is-loading="isLoading" />

        <div
          v-if="post"
          class="post"
        >
          <p>
            <b>
              @{{ post.profile.handle }}
            </b>
            -
            <span>
              {{ post.timestamp }}
            </span>
          </p>
          
          <p>
            {{ post.body }}
          </p>
        </div>
      </v-col>
    </v-row>
</template>
