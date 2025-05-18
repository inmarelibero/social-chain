export class Post {
    public readonly body: string;
    public readonly id: number;
    public readonly profileId: number;
    public readonly timestamp: string
    
    constructor(json: any) {
        this.body = json.body
        this.id = json.id
        this.profileId = json.profileId
        this.timestamp = json.timestamp
    }
    
}