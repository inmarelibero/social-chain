<script setup lang="ts">
import { Post } from '@/models/Post'

/**
 * 
 */
const props = defineProps<{
    // 
    posts: Post[],
}>()
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.post {
  margin-bottom: 20px;
  background-color: #fff;
  padding: $defaultPadding;
  border-radius: $defaultBorderRadius;
  border: $defaultBorder;
}
</style>

<template>
  <div v-for="post in props.posts" :key="post.id" class="post">
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
</template>