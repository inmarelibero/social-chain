<script setup lang="ts">
import { onMounted } from 'vue'
// import { useRoute } from 'vue-router'
import { OfflineSigner } from "@cosmjs/proto-signing";

import Navbar from '@/components/Navbar.vue'
import { KeplrManager } from '@/services/KeplrManager'

// const route = useRoute()

onMounted(() => {
  KeplrManager.login()
})
</script>

<template>
  <v-layout>
    <Navbar />
    
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-layout>
</template>
