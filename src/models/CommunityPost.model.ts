import { stringify } from "querystring";
import query, { pools } from "../services/db";

interface IPost {
    createPost(data: TPost): Promise<any>,
    deletePost(id: string): Promise<any>,
    getById(id: string): Promise<any>
}

type TPost = {
    caption: string,
    media: media[],
    tags?: Int16Array,
    community_id: string,
    member_id: string,
    created_at?: string
}

type media = {
    mediaType: string,
    mediaUrl: string
}

class Post implements IPost {

    async createPost(data: TPost): Promise<any> {
        const pool = await pools();
        const client = await pool.connect();
        try {
            const { caption, media, tags, community_id, member_id } = data
            await client.query("BEGIN");
            //saving post
            const postData = await client.query(`INSERT INTO community_posts(caption,media,community_id,member_id) VALUES (
                $1,$2::JSON[],$3,$4) RETURNING id,caption,media,community_id AS "communityId",member_id AS "memberId"
            `, [caption, media, community_id, member_id]);
            //saving post tags
            let tagData;
            if (tags) {

                let str = "INSERT INTO post_tags(post_id,tag_id) VALUES  "
                tags.forEach((id) => {
                    if (typeof id === "number")
                        str = str + `('${postData.rows[0].id}',${id}),`
                });

                str = str.substring(0, str.length - 1) + `RETURNING id,tag_id as "tagId"`;
                tagData = await client.query(str);
            }

            await client.query("COMMIT");

            return {
                postData: postData.rows[0] as TPost,
                tagData: tagData?.rows
            };
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            await client.release
        }
    }

    async deletePost(id: string): Promise<any> {
        const pool = await pools();
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            const tag = await client.query("DELETE FROM post_tags WHERE post_id=$1", [id]);
            const post = await client.query("DELETE FROM community_posts WHERE id=$1", [id]);
            // console.log(JSON.stringify(tag));
            // console.log(post);

            await client.query("COMMIT");
            return post.rowCount >= 1;
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            await client.release();
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const result = await query("SELECT * FROM community_posts WHERE id=$1", [id])
            return result[0]
        } catch (error) {
            throw error;
        }
    }
}


export default Post