<script setup lang="ts">
import { computed } from 'vue'
import { StringHelper } from '@/services/StringHelper'
import { useUserStore } from '@/stores/userStore'
import { KeplrManager } from '@/services/KeplrManager'

const userStore = useUserStore()
const isLogged = computed(() => userStore.isLogged)
const address = computed(() => userStore.address)

</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.link {
    color: #FFF !important;
}
</style>

<template>
  <div class="d-inline-block">
    <template v-if="!isLogged">
      <v-btn class="link" @click="KeplrManager.login()">Connect Wallet</v-btn>
    </template>
    <template v-if="isLogged">
      <v-btn class="link" :to="{ name: 'profile'}">
        {{ StringHelper.truncateMiddle(address, 12, 5) }}
      </v-btn>

      <v-btn class="link" @click="KeplrManager.logout()" variant="text">
        <v-icon icon="mdi-logout" size="x-small"/>
      </v-btn>
    </template>
  </div>
</template>