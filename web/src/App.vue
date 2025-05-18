<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { useRoute } from 'vue-router'

import { watch } from 'vue'

const route = useRoute()
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
