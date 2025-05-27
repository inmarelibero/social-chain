import { SigningStargateClient, defaultRegistryTypes as defaultStargateTypes } from '@cosmjs/stargate';
import { OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { useUserStore } from '@/stores/userStore'
import { UserApiManager } from "@/services/UserApiManager";
import { MsgCreateProfile } from "@/generated-proto/socialchain/profiles/tx.ts";
import { MsgCreatePost } from "@/generated-proto/socialchain/posts/tx.ts";

export class KeplrManager {
    static CHAIN_INFO = {
        chainId: 'socialchain',
        chainName: 'Social Chain',
        rpc: 'https://localhost:5173/rpc',
        rest: 'https://localhost:5173/api',
        bip44: {
            coinType: 118,
        },
        bech32Config: {
            bech32PrefixAccAddr: 'cosmos',
            bech32PrefixAccPub: 'cosmospub',
            bech32PrefixValAddr: 'cosmosvaloper',
            bech32PrefixValPub: 'cosmosvaloperpub',
            bech32PrefixConsAddr: 'cosmosvalcons',
            bech32PrefixConsPub: 'cosmosvalconspub',
        },
        currencies: [
            {
                coinDenom: 'SOC',
                coinMinimalDenom: 'usoc',
                coinDecimals: 6,
                coinGeckoId: 'social-coin', // optional
            },
        ],
        feeCurrencies: [
            {
                coinDenom: 'SOC',
                coinMinimalDenom: 'usoc',
                coinDecimals: 6,
            },
        ],
        stakeCurrency: {
            coinDenom: 'SOC',
            coinMinimalDenom: 'usoc',
            coinDecimals: 6,
        },
        features: ['stargate', 'ibc-transfer'],
        gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.04,
        },
    };

    /**
     * 
     * @returns 
     */
    static async useKeplrWallet(): Promise<{address: string, signer: OfflineSigner, client: SigningStargateClient}> {
        if (!window.keplr) {
            throw new Error('Please install Keplr Extension');
        }

        // Suggest chain if needed
        try {
            await window.keplr.experimentalSuggestChain(KeplrManager.CHAIN_INFO)
            await window.keplr.enable(KeplrManager.CHAIN_INFO.chainId);
        } catch (e) {
            console.error('Failed to suggest the chain', e);
        }

        const offlineSigner = window.getOfflineSigner(KeplrManager.CHAIN_INFO.chainId);
        const accounts = await offlineSigner.getAccounts();
        const address = accounts[0].address;

        // create Registry
        const myRegistry = new Registry(defaultStargateTypes);
        myRegistry.register("/socialchain.profiles.MsgCreateProfile", MsgCreateProfile);
        myRegistry.register("/socialchain.posts.MsgCreatePost", MsgCreatePost);

        // create client
        const client = await SigningStargateClient.connectWithSigner(
            KeplrManager.CHAIN_INFO.rpc,
            offlineSigner,
            { registry: myRegistry }
        );

        return {
            address,
            signer: offlineSigner,
            client,
        };
    }

    /**
     * 
     */
    static async login() {
        const userStore = useUserStore()
        
        try {
            KeplrManager.useKeplrWallet().then((
                {signer, address, client}: {signer: OfflineSigner, address: string, client: SigningStargateClient}
            ) => {
                userStore.setSigner(signer, address, client)

                KeplrManager.fetchAndStoreProfile()
            })
        } catch (err) {
            console.error('Wallet connection failed', err)
        }
    }

    /**
     * 
     */
    static async logout() {
        const userStore = useUserStore()
        userStore.setSigner(null, null, null)
        userStore.setProfile(null)
    }

    /**
     * Fetches the profile of the user and stores it
     */
    static async fetchAndStoreProfile(): Promise<void> {
        const userStore = useUserStore()
        
        return new Promise(async (resolve, reject) => {
            const address = userStore.address

            if (!address) {
                return resolve();
            }
            
            UserApiManager.fetchProfile(address)
                .then((profile) => {
                    userStore.setProfile(profile)
                    resolve()
                })
                
        })
    }
}