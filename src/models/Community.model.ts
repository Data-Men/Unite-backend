import query from "../services/db";

interface ICommunity {
    create(obj: Partial<TCommunityData>): Promise<any>
    updateByID(id: string, updateData: Partial<TCommunityData>): Promise<boolean>
    deleteById(id: string): Promise<boolean>
}

type TCommunityData = {
    name: string;
    description?: string;
    profile_pic?: string;
    banner_image?: string;
    privacy_status: string;
    created_by: string;
    // created_at?: string;
}

class Community implements ICommunity {

    async create(createData: TCommunityData): Promise<any> {
        try {
            const { name, description, privacy_status, banner_image, profile_pic, created_by } = createData
            console.log(createData);

            const sql = `INSERT INTO communities (name,description,profile_pic,banner_img,privacy_status,created_by,created_at) VALUES ($1,$2,$3,$4,$5,$6,NOW()) RETURNING id,name,description,profile_pic,banner_img,privacy_status,created_by,created_at ;`

            const result = await query(sql, [name, description, profile_pic, banner_image, privacy_status, created_by])
            console.log(result);
            return result
        } catch (error) {
            console.trace(error)
            return false
        }
    }

    async updateByID(id: string, updateData: Partial<TCommunityData>): Promise<any> {

        try {
            const { name, description, privacy_status, banner_image, profile_pic } = updateData

            const result = await query(`UPDATE communities SET name=$1,description=$2,privacy_status=$3,banner_img=$4,profile_pic=$5 WHERE id=$6 RETURNING id,name,description,profile_pic,banner_img,privacy_status,created_by,created_at`, [name, description, privacy_status, banner_image, profile_pic, id])
            console.log(result);
            return result
        } catch (error) {
            console.trace(error);
            return {}
        }
    }

    async deleteById(id: string): Promise<boolean> {
        try {
            const result = await query(`WITH deleted AS (DELETE FROM communities WHERE id=$1 RETURNING *) SELECT count(*) FROM deleted;`, [id]);
            console.log(`Delete Result:${JSON.stringify(result)}`);
            return true
        } catch (error) {
            console.trace(error);
            return false
        }
    }

}


export default Community