import { Profile } from "@/models/Profile";

export class Post {
    public readonly id: number;
    public readonly body: string;
    public readonly profile: Profile;
    public readonly timestamp: string
    
    constructor(id: number, body: string, profile: {id: number, handle: string}, timestamp: string) {
        this.id = id
        this.body = body
        this.timestamp = timestamp

        this.profile = new Profile(profile.id, profile.handle)
    }
}