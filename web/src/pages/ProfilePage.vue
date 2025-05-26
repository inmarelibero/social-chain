<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore'
import { UserApiManager } from "@/services/UserApiManager";

const userStore = useUserStore()
const address = computed(() => userStore.address)
const profile = computed(() => userStore.profile)

watch(() => userStore.address, (newValue) => {
  if (newValue) {
    UserApiManager.getBalance(newValue).then((result) => {
      balance.value = result
    })
  }
})

const balance = ref<{denom: string, amount: string} | null>(null)

</script>

<style scoped lang="scss">
</style>

<template>
    <v-row>
      <v-col class="vl-parent">
        <h1>
          Profile
        </h1>
        <p>
          <b>Address</b> {{ address }}
        </p>
        <p v-if="balance != null">
          <b>Balance</b> {{ balance.amount }} {{ balance.denom }}
        </p>

        <!-- PROFILE -->
        <template v-if="profile">
          <p>
            <b>handle</b> @{{ profile.handle }}
          </p>
          <p>
            <b>id</b> {{ profile.id }}
          </p>
        </template>
        <template v-if="!profile">
          A profile is necessay to be able to post. You don't have a profile yet.
          <br>
          <v-btn :to="{ name: 'profile_create' }" plain>
            CREATE A PROFILE NOW
          </v-btn>
        </template>
      </v-col>
    </v-row>
</template>
