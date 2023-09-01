import { log } from "console";
import query from "../services/db";

interface ITags {
    create(data: Partial<TTag>): Promise<any[]>,
    createMany(data: Partial<TTag[]>): Promise<any>,
    getAllTags(): Promise<TTag[]>,
    searchTag(tagName: String): Promise<TTag[]>,
    getTagById(id: number): Promise<any[]>,
    getAllExcept(ids: number[]): Promise<any[]>,
}

type TTag = {
    id?: number;
    name: string;
    category: string
}

class Tag implements ITags {

    async create(data: Partial<TTag>) {
        try {
            const { name, category } = data
            const result = await query("INSERT INTO tags (name,category) VALUES ($1,$2) RETURNING id,name", [name, category]);
            return result
        } catch (error) {
            console.log("Error While Creating Tag");
            console.log(error);

            return []
        }
    }

    async createMany(data: Partial<TTag[]>): Promise<any> {
        try {
            const len = data.length
            //how to create more than one record at once           
        } catch (error) {

        }
    }

    async getAllTags(): Promise<TTag[]> {
        try {
            const result = await query('SELECT id,name,tag_color as "color" FROM tags;')
            return result;
        } catch (error) {
            throw new Error("some error");
        }
    }

    async searchTag(tagName: String): Promise<TTag[]> {
        try {
            const result = await query("SELECT id,name,tag_color as color FROM tags where name ILIKE $1 ORDER BY id ", [`${tagName}%`])
            console.log(result);
            return result
        } catch (error) {
            throw new Error("some error");
        }
    }

    async getTagById(id: number): Promise<any[]> {
        try {
            const result = await query('SELECT id,name,tag_color as "color" FROM tags where name=$1 ', [id])
            return result
        } catch (error) {
            throw new Error("some error");
        }
    }
    async getAllExcept(ids: number[]): Promise<any[]> {
        
        try {
            const result = await query(`SELECT id,name,tag_color as "color" FROM tags where id not in (${ids}) ORDER BY id`)
            return result
        } catch (error) {
            console.log(error);
            throw new Error("some error");
        }
    }
}

export default Tag