import query from "../services/db";

interface ICommunityMember {
    add(data: TMember): Promise<any>,
    remove(id: string): Promise<boolean>,
    getAllMembers(community_id: string): Promise<any[]>,
    getMemberByName(member_name: String): Promise<any[]>
}

type TMember = {
    id?: string;
    community_id: string,
    user_id: string,
    username: string,
    member_name: string,
    memeber_pic?: string
}

class CommunityMember implements ICommunityMember {

    async add(data: TMember): Promise<any> {
        try {
            const { community_id, user_id, username, member_name, memeber_pic } = data
            const result = await query(`INSERT INTO community_members(community_id,user_id,username,member_name,member_pic) VALUES
            ($1,$2,$3,$4,$5) RETURNING id,community_id ,user_id,username,member_name,member_pic`, [community_id, user_id, username, member_name, memeber_pic])
            return result
        } catch (error) {
            console.log(error);
        }
    }

    async remove(id: string): Promise<boolean> {
        try {
            const result = await query("UPDATE community_members SET  is_member='f',updated_at=NOW() WHERE id=$1 RETURNING is,username,is_member", [id]);
            return true
        } catch (error) {
            return false
        }
    }

    async getAllMembers(community_id: string): Promise<any[]> {
        try {
            const result = await query("SELECT user_id,username,member_name,member_pic FROM community_members WHERE  community_id=$1", [community_id]);
            return result
        } catch (error) {
            return []
        }
    }

    async getMemberByName(member_name: String): Promise<any[]> {
        try {
            const result = await query("SELECT user_id,username,member_name,member_pic FROM community_members WHERE member_name=$1 ", [member_name])
            return result
        } catch (error) {
            return []
        }
    }

}