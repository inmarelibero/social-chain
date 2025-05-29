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
  margin-top: 20px;
  background-color: #fff;
  padding: $defaultPadding;
  border-radius: $defaultBorderRadius;
  border: $defaultBorder;
  cursor: pointer;

  &:first-child {
    margin-top: 0;
  }
}
</style>

<template>
  <div>
    <div
      v-for="post in props.posts"
      :key="post.id"
      class="post"
      @click="$router.push({ name: 'post_show', params: { id: post.id } });"
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
  </div>
</template>