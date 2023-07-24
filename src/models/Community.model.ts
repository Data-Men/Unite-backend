import query from "../services/db";

interface ICommunity {
    create(obj: Partial<TCommunityData>): Promise<any>
    updateByID(id: string, updateData: Partial<TCommunityData>): Promise<boolean>
    delete(id: string): Promise<boolean>
}

type TCommunityData = {
    name: string;
    description?: string;
    profile_pic?: string;
    banner_image?: string;
    privacy_status: string;
    tags?: string[];
    created_by: string;
    created_at?: string;
}

class Community implements ICommunity {

    async create(createData: TCommunityData): Promise<any> {
        try {
            const { name, description, privacy_status, banner_image, profile_pic, tags, created_by, created_at } = createData
            console.log(createData);

            const sql = `INSERT INTO communities (name,description,profile_pic,banner_img,privacy_status,created_by,created_at) VALUES ($1,$2,$3,$4,$5,$6,NOW()) RETURNING id,name,description ;
            `
            const result = await query(sql, [name, description, profile_pic, banner_image, privacy_status, created_by])
            console.log(result);
            return result
        } catch (error) {
            console.trace(error)
            return false
        }
    }

    async updateByID(id: string, updateData: Partial<TCommunityData>): Promise<boolean> {

        return false

    }

    async delete(id: string): Promise<boolean> {
        return true
    }

}


export default Community