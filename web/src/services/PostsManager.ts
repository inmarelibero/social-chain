import axios from 'axios';
import { Post } from '../models/Post';

export class PostsManager {
    /**
     * 
     * @param param0 
     * @returns 
     */
    static async fetchLatestPosts({ limit }): Promise<Post[]> {
        return new Promise(async (resolve, reject) => {         
            const restUrl = '/api'; // Replace with your REST server URL
            const endpoint = '/socialchain/posts/latests'; // Replace with your module's endpoint

            // Call the LatestPosts query
            axios.get(`${restUrl}${endpoint}`, {
                params: { limit }
            }).then((response) => {
                const posts = response.data.posts.map((result: any) => {
                    return new Post(result.id, result.body, result.profile, result.timestamp);
                })

                console.log('posts', posts)
    
                resolve(posts)
            })

        })
    }
}