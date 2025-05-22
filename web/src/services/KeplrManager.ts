import { SigningStargateClient } from '@cosmjs/stargate';
import { OfflineSigner } from "@cosmjs/proto-signing";
import { useUserStore } from '@/stores/userStore'

export class KeplrManager {
    static CHAIN_INFO = {
        chainId: 'social-chain-id',
        chainName: 'Social Chain',
        rpc: 'https://localhost:5173/rpc',
        rest: 'https://localhost:5173/api',
        bip44: {
            coinType: 118,
        },
        bech32Config: {
            bech32PrefixAccAddr: 'social',
            bech32PrefixAccPub: 'socialpub',
            bech32PrefixValAddr: 'socialvaloper',
            bech32PrefixValPub: 'socialvaloperpub',
            bech32PrefixConsAddr: 'socialvalcons',
            bech32PrefixConsPub: 'socialvalconspub',
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
    static async useKeplrWallet() {
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

        const client = await SigningStargateClient.connectWithSigner(
            KeplrManager.CHAIN_INFO.rpc,
            offlineSigner
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
                {signer, address}: {signer: OfflineSigner, address: string}
            ) => {
                console.log('s', signer, address)
                userStore.setSigner(signer, address)
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
        userStore.setSigner(null, null)
    }
}