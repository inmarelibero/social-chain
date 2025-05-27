import { SigningStargateClient } from '@cosmjs/stargate';
import { defineStore } from 'pinia'
import { OfflineSigner } from "@cosmjs/proto-signing";
import { Profile } from "@/models/Profile";

export const useUserStore = defineStore('user', {
    state: () => ({
        /**
         * 
         * @returns 
         */
        address: null as string | null,

        /**
         * 
         * @returns 
         */
        profile: null as Profile | null,

        /**
         * 
         * @returns 
         */
        signer: null as OfflineSigner | null,

        /**
         * 
         * @returns 
         */
        client: null as SigningStargateClient | null,
    }),
    actions: {
        /**
         * 
         */
        setProfile(profile: Profile | null = null) {
            this.profile = profile
        },

        /**
         * 
         */
        setSigner(signer: OfflineSigner | null, address: string | null, client: SigningStargateClient | null = null) {
            this.signer = signer;
            this.address = address;
            this.client = client;
        },
    },
    getters: {
        /**
         * 
         * @param state 
         * @returns 
         */
        isLogged: (state) => !!state.signer,

        /**
         * 
         * @param state 
         * @returns 
         */
        isLoggedWithProfile: (state) => !!state.signer && !!state.profile,
    },
})
