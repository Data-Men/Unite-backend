"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importStar(require("../services/db"));
class Post {
    createPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield (0, db_1.pools)();
            const client = yield pool.connect();
            try {
                const { caption, media, tags, community_id, member_id } = data;
                yield client.query("BEGIN");
                //saving post
                const postData = yield client.query(`INSERT INTO community_posts(caption,media,community_id,member_id) VALUES (
                $1,$2::JSON[],$3,$4) RETURNING id,caption,media,community_id AS "communityId",member_id AS "memberId"
            `, [caption, media, community_id, member_id]);
                //saving post tags
                let tagData;
                if (tags) {
                    let str = "INSERT INTO post_tags(post_id,tag_id) VALUES  ";
                    tags.forEach((id) => {
                        if (typeof id === "number")
                            str = str + `('${postData.rows[0].id}',${id}),`;
                    });
                    str = str.substring(0, str.length - 1) + `RETURNING id,tag_id as "tagId"`;
                    tagData = yield client.query(str);
                }
                yield client.query("COMMIT");
                return {
                    postData: postData.rows[0],
                    tagData: tagData === null || tagData === void 0 ? void 0 : tagData.rows
                };
            }
            catch (error) {
                yield client.query("ROLLBACK");
                throw error;
            }
            finally {
                yield client.release;
            }
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield (0, db_1.pools)();
            const client = yield pool.connect();
            try {
                yield client.query("BEGIN");
                const tag = yield client.query("DELETE FROM post_tags WHERE post_id=$1", [id]);
                const post = yield client.query("DELETE FROM community_posts WHERE id=$1", [id]);
                // console.log(JSON.stringify(tag));
                // console.log(post);
                yield client.query("COMMIT");
                return post.rowCount >= 1;
            }
            catch (error) {
                yield client.query("ROLLBACK");
                throw error;
            }
            finally {
                yield client.release();
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.default)("SELECT * FROM community_posts WHERE id=$1", [id]);
                return result[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = Post;
