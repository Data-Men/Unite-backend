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
    member_pic?: string,
    member_role?: string
}

class CommunityMember implements ICommunityMember {

    async add(data: TMember): Promise<any> {
        try {
            const { community_id, user_id, username, member_name, member_pic, member_role } = data
            const result = await query(`INSERT INTO community_members(community_id,user_id,username,member_name,member_pic,member_role) VALUES
            ($1,$2,$3,$4,$5,$6) RETURNING id,community_id as communityId,user_id as userId,username,member_name AS memberName,member_pic AS memberPic,member_role AS memberRole`, [community_id, user_id, username, member_name, member_pic, member_role])
            return result
        } catch (error) {
            throw error
        }
    }

    async remove(id: string): Promise<any> {
        try {
            const result = await query(`UPDATE community_members SET  is_member='f',updated_at=NOW() WHERE id=$1 RETURNING id,username,is_member;`, [id]);
            return result
        } catch (error) {
          throw error
        }
    }

    async getAllMembers(community_id: string): Promise<any[]> {
        try {
            const result = await query("SELECT id,user_id as userId,username,member_name AS memberName,member_pic AS memberPic,member_role AS memberRole,is_member AS ismember FROM community_members WHERE  community_id=$1", [community_id]);
            return result
        } catch (error) {
            throw error
        }
    }

    async getMemberByName(member_name: String): Promise<any[]> {
        try {
            const result = await query("SELECT id,user_id as userId,username,member_name AS memberName,member_pic AS memberPic,member_role AS memberRole FROM community_members WHERE is_member='t' AND member_name=$1 ", [member_name])
            return result
        } catch (error) {
            throw error
        }
    }

}

export default CommunityMember;