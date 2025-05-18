<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { StargateClient } from '@cosmjs/stargate';
import { Post } from '../models/Post';
import { PostsManager } from '../services/PostsManager';



const posts = ref<Post[]>([]);

onMounted(async () => {
  loadPosts()
});


function loadPosts() {
  PostsManager.fetchLatestPosts({limit: 10})
  .then((result: Post[]) => {
    posts.value = result;
  })
}

</script>



<style scoped lang="scss">
@import 'vuetify/_settings.scss';

.post {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

</style>

<template>
    <v-row>
      <v-col>
        <p style="margin-top: 60px;">
          Social Chain
        </p>
      </v-col>
    </v-row>

    <!-- Latest Posts -->
    <v-row>
      <v-col>
        <h1>Latest Posts</h1>
          <div v-for="post in posts" :key="post.id" class="post">
            <h2>{{ post.body }}</h2>
            <p>
              {{ post.timestamp }}
            </p>
          </div>
      </v-col>
    </v-row>
</template>
