<script setup lang="ts">
import { ref } from 'vue'

import Login from '@/components/Login.vue'

const drawer = ref(false);

</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.v-toolbar {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1) !important;
    background-color: $navbar_background;

    .home-button {
        padding-top: 7px;
        font-weight: 600;
        font-size: 1.3rem;
        color: #FFF;
        cursor: pointer;
    
        .initial {
            background-color: $color_purple_light;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
        }
    }

    .link {
        color: #FFF !important;
    }
}
</style>

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
                <div class="home-button" @click="$router.push({ name: 'home' })">
                    <span class="initial">S</span> <span>SocialChain</span>
                </div>
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