<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { UserApiManager } from "@/services/UserApiManager";
import Overlay from "@/components/Overlay.vue";
import { KeplrManager } from '@/services/KeplrManager';

const router = useRouter()
const userStore = useUserStore()
const address = computed(() => userStore.address)
const profile = computed(() => userStore.profile)
const isLoading = ref<boolean>(false)

const rules =[
  value => !!value || 'Required.',
  value => (value && value.length >= 3) || 'Min 3 characters',
];

const handle = ref(null);

// redirect to /profile if user already has a Profile
watch(() => userStore.profile, (newValue) => {
  if (newValue != null) {
    router.push({ name: 'profile' });
  }
})

/**
 * 
 */
function createProfile() {
  if (handle.value && handle.value.length >= 3) {
    isLoading.value = true;

    UserApiManager.createProfile(address.value, handle.value)
      .then(() => {
        // ugly way to reload data
        KeplrManager.login()
          .then(() => {
            router.push({ name: 'profile' })
          })
      })
      .catch((error) => {
        console.error('Error creating profile:', error);
      })
      .then(() => {
        isLoading.value = false;
      });
  } else {
    console.error('Handle must be at least 3 characters long');
  }
}

</script>

<style scoped lang="scss">
</style>

<template>
    <v-row>
      <v-col>
        <h1>
          Create Profile
        </h1>
      </v-col>
    </v-row>

    <!-- PROFILE -->
    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <Overlay :is-loading="isLoading" />

        <div>
          <v-text-field
            :rules="rules"
            hide-details="auto"
            label="Choose a handle"
            v-model="handle"
          ></v-text-field>
          <br>
          <v-btn @click="createProfile()" color="primary">
            CREATE A PROFILE NOW
          </v-btn>
        </div>
      </v-col>
    </v-row>
</template>
