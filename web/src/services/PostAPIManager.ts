import { Post } from '@/models/Post';
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import { CosmosApiManager } from '@/services/CosmosApiManager'
import { useUserStore } from '@/stores/userStore'
import { MsgCreatePost } from "@/generated-proto/socialchain/posts/tx.ts";

export class PostAPIManager {
    /**
     * 
     * @param param0 
     * @returns 
     */
    static async fetchLatestPosts(limit: number = 10): Promise<Post[]> {
        return new Promise(async (resolve, reject) => {         
            // Call the LatestPosts query
            CosmosApiManager.callAPI('/socialchain/posts/latests', {
                limit
            }).then((response) => {
                const posts = response.data.posts.map((result: any) => {
                    return new Post(result.id, result.body, result.profile, result.timestamp);
                })

                resolve(posts)
            })

        })
    }
    
    /**
     * 
     */
    static async createPost(body: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const userStore = useUserStore()

            const msg = MsgCreatePost.fromPartial({
                creator: userStore.address,
                body: body,
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
                            typeUrl: "/socialchain.posts.MsgCreatePost",
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
                    console.log("createPost() error:", error)
                    reject(error)
                })
        })
    }
}