// src/stores/postStore.ts
import { defineStore } from 'pinia'
import { OfflineSigner } from "@cosmjs/proto-signing";

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
        signer: null as OfflineSigner | null,
    }),
    actions: {
        /**
         * 
         * @param s 
         */
        setSigner(signer: OfflineSigner | null, address: string | null) {
            this.signer = signer;
            this.address = address;
        },
    },
    getters: {
        /**
         * 
         * @param state 
         * @returns 
         */
        isLogged: (state) => !!state.signer,
    },
})
