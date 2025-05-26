import { Post } from '@/models/Post';
import { CosmosApiManager } from '@/services/CosmosApiManager'

export class PostsManager {
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
}