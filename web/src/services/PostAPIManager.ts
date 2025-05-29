import { Post } from '@/models/Post';
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import { CosmosApiManager } from '@/services/CosmosApiManager'
import { useUserStore } from '@/stores/userStore'
import { MsgCreatePost } from "@/generated-proto/socialchain/posts/tx.ts";

export class PostAPIManager {
    static ITEMS_PER_PAGE_POST: number = 10;
    
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

    /**
     * 
     * @param limit 
     * @returns 
     */
    static async fetchLatestPosts(from: number): Promise<Post[]> {
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
     * @param id
     * @returns 
     */
    static async fetchPost(id: number): Promise<Post> {
        return new Promise(async (resolve, reject) => {         
            CosmosApiManager.callAPI(`/socialchain/posts/${id}`).then((response) => {
                const result = response.data.post;
                const post = new Post(result.id, result.body, result.profile, result.timestamp);  

                resolve(post)
            })

        })
    }
}