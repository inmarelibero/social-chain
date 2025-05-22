<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import Login from '@/components/Login.vue'

const drawer = ref(false);

</script>

<template>
    <v-app-bar
        class="main-navbar"
        :floating="true"
    >
        <v-app-bar-nav-icon
            class="d-inline-block d-sm-none"
            @click="drawer = true"
        />

        <v-container class="d-flex">
            
            <div class="d-none d-sm-inline-block">
                <v-btn
                    v-bind:class="{ 'active': $route.name === 'home' }"
                    :to="{ name: 'home'}"
                >
                    HOME
                </v-btn>
            </div>

            <v-spacer class="d-none d-sm-inline-block" />

            <Login />
        </v-container>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group>
            <v-list-item
                :to="{ name: 'home'}" v-bind:class="{ 'active': $route.name === 'home' }"
            >
                <v-list-item-title>
                HOME
                </v-list-item-title>
            </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>