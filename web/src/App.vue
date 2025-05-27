<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Navbar from '@/components/Navbar.vue'
import { KeplrManager } from '@/services/KeplrManager'

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
