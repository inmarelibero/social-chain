<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { PostAPIManager } from "@/services/PostAPIManager";
import Overlay from "@/components/Overlay.vue";

const userStore = useUserStore()
const emit = defineEmits(['created'])

const isLoggedWithProfile = computed(() => userStore.isLoggedWithProfile)
const isLoading = ref<boolean>(false)
const body = ref<string | null>(null);

/**
 * 
 */
function createPost(input: string | null) {
  if (!(input && input.length > 0) ) {
    console.error('You must be logged in and the post body cannot be empty');
  }

  isLoading.value = true;

  PostAPIManager.createPost(input)
    .then(() => {
      body.value = null; // Clear the input after posting

      emit('created')
    })
    .catch((error) => {
      console.error('Error creating post:', error);
    })
    .then(() => {
      isLoading.value = false;
    });
}
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.wrapper {
  position: relative;
  background-color: #fff;
  padding: $defaultPadding;
  border-radius: $defaultBorderRadius;
  border: $defaultBorder;
}
</style>

<template>
  <!-- FORM -->
  <template v-if="isLoggedWithProfile">
    <v-row class="mb-4">
      <v-col cols="12">
        <div class="wrapper">
          <Overlay :is-loading="isLoading" />
           
          <div>
            <v-text-field
              hide-details="auto"
              label="What are you thinking?"
              v-model="body"
            />
            <div class="text-right mt-1">
              <v-btn
                color="primary"
                :disabled="!body || body.length === 0 || isLoading"
                @click="createPost(body)"
              >
                POST
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </template>
</template>