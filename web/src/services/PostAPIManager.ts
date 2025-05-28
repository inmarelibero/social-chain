import { Post } from '@/models/Post';
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import { CosmosApiManager } from '@/services/CosmosApiManager'
import { useUserStore } from '@/stores/userStore'
import { MsgCreatePost } from "@/generated-proto/socialchain/posts/tx.ts";

export class PostAPIManager {
    static ITEMS_PER_PAGE_POST: number = 10;

    /**
     * 
     * @param limit 
     * @returns 
     */
    static async fetchLatestPosts(from: number): Promise<Post[]> {
        console.log("PostAPIManager.fetchLatestPosts() called with from:", from)
        return new Promise(async (resolve, reject) => {         
            // Call the LatestPosts query
            CosmosApiManager.callAPI('/socialchain/posts/latests', {
                count: PostAPIManager.ITEMS_PER_PAGE_POST,
                from: from,
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
     * @param limit 
     * @returns 
     */
    static async fetchPostsCount(): Promise<number> {
        return new Promise(async (resolve, reject) => {         
            // Call the LatestPosts query
            CosmosApiManager.callAPI('/socialchain/posts/count').then((response) => {
                resolve(response.data.count)
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