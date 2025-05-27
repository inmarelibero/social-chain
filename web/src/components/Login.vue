<script setup lang="ts">
import { computed } from 'vue'
import { StringHelper } from '@/services/StringHelper'
import { useUserStore } from '@/stores/userStore'
import { KeplrManager } from '@/services/KeplrManager'

const userStore = useUserStore()
const isLogged = computed(() => userStore.isLogged)
const address = computed(() => userStore.address)

</script>

<template>
  <div class="d-inline-block">
    <template v-if="!isLogged">
      <v-btn @click="KeplrManager.login()">Connect Wallet</v-btn>
    </template>
    <template v-if="isLogged">
      <v-btn class="link" :to="{ name: 'profile'}" plain>
        {{ StringHelper.truncateMiddle(address, 12, 5) }}
      </v-btn>

      <v-btn @click="KeplrManager.logout()" icon >
        <v-icon icon="mdi-logout" size="x-small" text/>
      </v-btn>
    </template>
  </div>
</template>