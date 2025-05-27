import { CosmosApiManager } from "@/services/CosmosApiManager";
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import { useUserStore } from '@/stores/userStore'
import { Profile } from '@/models/Profile'
import { MsgCreateProfile } from "@/generated-proto/socialchain/profiles/tx.ts";

export class UserApiManager {
    /**
     * 
     * @param param0 
     * @returns 
     */
    static async getBalance(address: string): Promise<{denom: string, amount: string}> {
        return new Promise(async (resolve, reject) => {
            const userStore = useUserStore()
            
            try {
                const result = await userStore.client.getBalance(address, 'usoc')

                resolve(result);
            } catch (err) {
                console.error(err)
            }
        })
    }

    /**
     * 
     * @param param0 
     * @returns 
     */
    static async fetchProfile(address: string): Promise<Profile> {
        return new Promise(async (resolve, reject) => {   
            try {      
                CosmosApiManager
                    .callAPI(`/socialchain/profiles/owned_by/${address}`)
                    .then((response) => {
                        const data =  response.data

                        resolve(new Profile(data.id, data.handle))
                    })
            } catch(error) {
                console.error('Error fetching profile:', error);
                reject(error);
            };
            // ADDRESS_DOES_NOT_OWN_ANY_HANDLE
        })
    }

    /**
     * 
     */
    static async createProfile(address: string, handle: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const userStore = useUserStore()

            const msg = MsgCreateProfile.fromPartial({
                creator: address,
                handle: handle,
            })

            const fee = {
                amount: [{ denom: "usoc", amount: "5000" }],
                gas: "200000",
            }

            if (!userStore.client)  {
                return reject(new Error("Client not initialized"))
            }

            if (!userStore.signer) {
                throw new Error("Sender is empty or undefined");
            }

            userStore.client
                .signAndBroadcast(
                    userStore.address,
                    [
                        {
                            typeUrl: "/socialchain.profiles.MsgCreateProfile",
                            value: msg,
                        }
                    ],
                    fee,
                    ""
                )
                .then((result) => {
                    assertIsDeliverTxSuccess(result)
                    resolve()
                })
                .catch((error) => {
                    console.log("createProfile() error:", error)
                    reject(error)
                })
        })
    }
}