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
}
</style>

<template>
  <div class="wrapper">
    <p>
      Social Chain
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