import { json } from "stream/consumers";
import query, { pools } from "../services/db";
import { type } from "os";

interface ICommunity {
    create(comunityData: Partial<TCommunityData>, memberData: TMember, tags: Int16Array): Promise<any>
    updateByID(id: string, updateData: Partial<TCommunityData>): Promise<boolean>
    deleteById(id: string): Promise<boolean>
    getByName(name: string): Promise<TCommunityData[]>
    getById(id: string): Promise<TCommunityData[]>
}

type TCommunityData = {
    name: string;
    description?: string;
    profile_pic?: string;
    banner_image?: string;
    privacy_status: string;
    created_by: string;
    created_at?: string;
}
type TMember = {
    id?: string;
    community_id?: string,
    user_id: string,
    username: string,
    member_name: string,
    member_pic?: string,
    member_role?: string
}

class Community implements ICommunity {

    async create(comunityData: TCommunityData, memberData: TMember, tagIds: Int16Array): Promise<any> {
        const pool = await pools();
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const { name, description, privacy_status, banner_image, profile_pic, created_by } = comunityData
            console.log(comunityData);
            const { user_id, username, member_name, member_pic } = memberData
            const communityInsert = `INSERT INTO communities (name,description,profile_pic,banner_img,privacy_status,created_by,created_at) VALUES ($1,$2,$3,$4,$5,$6,NOW()) RETURNING id,name,description,profile_pic AS profilePic,banner_img AS bannerImg,privacy_status AS privacyStatus,created_by AS createdBy;`

            const cData = [name, description, profile_pic, banner_image, privacy_status, created_by];
            const communityData = await client.query(communityInsert, cData);

            const memberInsert = `INSERT INTO community_members (community_id,user_id,username,member_name,member_pic,member_role) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id,community_id AS communityId,is_member AS isMember,user_id AS userID,username,member_name AS memberName,member_pic AS memberPic,member_role AS memberRole;`;
            const mData = [communityData.rows[0].id, user_id, username, member_name, member_pic, "Admin"];

            const communityMemberData = await client.query(memberInsert, mData);


            // const tagData = tagIds.map(async (id) => {
            //     try {
            //         const result = await client.query("INSERT INTO community_tags(community_id,tag_id)  VALUES($1,$2) RETURNING id,community_id AS communityId", [communityData.rows[0].id, id]);
            //         console.log(result);

            //         return result.rows[0];
            //     } catch (error) {

            //     }

            // })

            let str = "INSERT INTO community_tags (community_id,tag_id)  VALUES  "

            tagIds.forEach((id) => {
                if (typeof id === "number")
                    str = str + `('${communityData.rows[0].id}',${id}),`
            });

            str = str.substring(0, str.length - 1) + "RETURNING id,community_id AS communityId,tag_id as tagId";

            const tagData = await client.query(str);

            await client.query('COMMIT');
            return {
                communityData: communityData.rows[0],
                communityMemberData: communityMemberData.rows[0],
                tags: tagData.rows
            };
        } catch (error) {
            console.error(error);

            await client.query('ROLLBACK');
            throw error
        } finally {
            await client.release();
        }
    }

    async updateByID(id: string, updateData: Partial<TCommunityData>): Promise<any> {

        try {
            const { description, privacy_status, banner_image, profile_pic } = updateData

            const result = await query(`UPDATE communities SET description=$1,privacy_status=$2,banner_img=$3,profile_pic=$4 WHERE id=$5 RETURNING id,name,description,profile_pic,banner_img,privacy_status,created_by,created_at`, [description, privacy_status, banner_image, profile_pic, id])

            return result
        } catch (error) {
            throw new Error("Update Faild");
        }
    }

    async deleteById(id: string): Promise<boolean> {
        try {
            const result = await query(`WITH deleted AS (DELETE FROM communities WHERE id=$1 RETURNING *) SELECT count(*) FROM deleted;`, [id]);
            return true
        } catch (error) {
            // console.trace(error);
            throw new Error("Delete Faild");
        }
    }

    async getByName(name: string): Promise<TCommunityData[] | any[]> {
        try {
            const result = await query(`SELECT * FROM communities WHERE name like $1;`, [`${name}%`]) as TCommunityData[] | any[]
            return result
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string): Promise<TCommunityData[] | any[]> {
        try {
            const result = await query(
            `select cu.*, (select json_agg(json_build_object('id',cm.id,'userId',cm.user_id,'username',cm.username,'memberName',
            cm.member_name,'memberPic',cm.member_pic,'memberRole',cm.member_role)) 
            from community_members cm 
            where cm.community_id=cu.id
                     and cm.is_member='t') as members,
           (select json_agg(json_build_object('id',cp.id,'caption',cp.caption,'media',cp.media,'created_at',cp.created_at
                                             ,'memberId',cm.id,'userId',cm.user_id,'username',cm.username,'memberName',cm.member_name
                                              ,'memberPic',cm.member_pic,'memberRole',cm.member_role)) 
            from community_posts cp
            LEFT JOIN community_members cm ON cm.id=cp.member_id
            where cp.community_id=cu.id ) as posts 
            FROM communities cu  
            where cu.id=$1`,
             [id]) as TCommunityData[] | any[]
           
            return result[0]
        } catch (error) {
            throw error;
        }
    }
}


export default Community