<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const profile = computed(() => userStore.profile)
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.wrapper {
  margin-bottom: 20px;
  background-color: #fff;
  padding: $defaultPadding;
  border-radius: $defaultBorderRadius;
  border: $defaultBorder;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

<template>
  <div class="wrapper">
    <p>
      Social Chain
    </p>

    <p>
      <v-btn :to="{ name: 'home' }" variant="plain" class="px-0">
        <v-icon icon="mdi-home" /> HOME
      </v-btn>
    </p>

    <template v-if="profile">
      <p>
        <b>
          @{{ profile.handle }}
        </b>
      </p>
    </template>
  </div>
</template>