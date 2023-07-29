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
class Community {
    create(comunityData, memberData, tagIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield (0, db_1.pools)();
            const client = yield pool.connect();
            try {
                yield client.query('BEGIN');
                const { name, description, privacy_status, banner_image, profile_pic, created_by } = comunityData;
                console.log(comunityData);
                const { user_id, username, member_name, member_pic } = memberData;
                const communityInsert = `INSERT INTO communities (name,description,profile_pic,banner_img,privacy_status,created_by,created_at) VALUES ($1,$2,$3,$4,$5,$6,NOW()) RETURNING id,name,description,profile_pic AS profilePic,banner_img AS bannerImg,privacy_status AS privacyStatus,created_by AS createdBy;`;
                const cData = [name, description, profile_pic, banner_image, privacy_status, created_by];
                const communityData = yield client.query(communityInsert, cData);
                const memberInsert = `INSERT INTO community_members (community_id,user_id,username,member_name,member_pic,member_role) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id,community_id AS communityId,is_member AS isMember,user_id AS userID,username,member_name AS memberName,member_pic AS memberPic,member_role AS memberRole;`;
                const mData = [communityData.rows[0].id, user_id, username, member_name, member_pic, "Admin"];
                const communityMemberData = yield client.query(memberInsert, mData);
                // const tagData = tagIds.map(async (id) => {
                //     try {
                //         const result = await client.query("INSERT INTO community_tags(community_id,tag_id)  VALUES($1,$2) RETURNING id,community_id AS communityId", [communityData.rows[0].id, id]);
                //         console.log(result);
                //         return result.rows[0];
                //     } catch (error) {
                //     }
                // })
                let str = "INSERT INTO community_tags (community_id,tag_id)  VALUES  ";
                tagIds.forEach((id) => {
                    if (typeof id === "number")
                        str = str + `('${communityData.rows[0].id}',${id}),`;
                });
                str = str.substring(0, str.length - 1) + "RETURNING id,community_id AS communityId,tag_id as tagId";
                const tagData = yield client.query(str);
                yield client.query('COMMIT');
                return {
                    communityData: communityData.rows[0],
                    communityMemberData: communityMemberData.rows[0],
                    tags: tagData.rows
                };
            }
            catch (error) {
                console.error(error);
                yield client.query('ROLLBACK');
                throw error;
            }
            finally {
                yield client.release();
            }
        });
    }
    updateByID(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, privacy_status, banner_image, profile_pic } = updateData;
                const result = yield (0, db_1.default)(`UPDATE communities SET name=$1,description=$2,privacy_status=$3,banner_img=$4,profile_pic=$5 WHERE id=$6 RETURNING id,name,description,profile_pic,banner_img,privacy_status,created_by,created_at`, [name, description, privacy_status, banner_image, profile_pic, id]);
                console.log(result);
                return result;
            }
            catch (error) {
                console.trace(error);
                return {};
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.default)(`WITH deleted AS (DELETE FROM communities WHERE id=$1 RETURNING *) SELECT count(*) FROM deleted;`, [id]);
                // console.log(`Delete Result:${JSON.stringify(result)}`);
                return true;
            }
            catch (error) {
                console.trace(error);
                return false;
            }
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.default)(`SELECT * FROM communities WHERE name like $1;`, [`${name}%`]);
                return result;
            }
            catch (error) {
                return [];
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.default)(`SELECT * FROM communities WHERE id=$1;`, [id]);
                return result;
            }
            catch (error) {
                return [];
            }
        });
    }
}
exports.default = Community;
