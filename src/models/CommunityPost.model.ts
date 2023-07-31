import query, { pools } from "../services/db";

interface ICommunity {
    createPost(data: TPost): Promise<any>,
    deletePost(id: string): Promise<any>,
    getAll(): Promise<any>
}

type TPost = {
    image: string,
    caption: string,
    tags: [],
    created_at: string,
    community_id?: string
}

class Community implements ICommunity {

    async createPost(data: TPost): Promise<any> {
        try {

        } catch (error) {

        }
    }

    async deletePost(id: string): Promise<any> {
        try {

        } catch (error) {

        }
    }

    async getAll():Promise<any> {
        try {
            
        } catch (error) {
            
        }
    }
}


export default Community