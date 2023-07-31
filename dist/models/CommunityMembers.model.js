"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../services/db"));
class CommunityMember {
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { community_id, user_id, username, member_name, member_pic, member_role } = data;
                const result = yield (0, db_1.default)(`INSERT INTO community_members(community_id,user_id,username,member_name,member_pic,member_role) VALUES
            ($1,$2,$3,$4,$5,$6) RETURNING id,community_id as communityId,user_id as userId,username,member_name AS memberName,member_pic AS memberPic,member_role AS memberRole`, [community_id, user_id, username, member_name, member_pic, member_role]);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.default)(`UPDATE community_members SET  is_member='f',updated_at=NOW() WHERE id=$1 RETURNING id,username,is_member;`, [id]);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllMembers(community_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.default)("SELECT id,user_id as userId,username,member_name AS memberName,member_pic AS memberPic,member_role AS memberRole,is_member AS ismember FROM community_members WHERE  community_id=$1", [community_id]);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getMemberByName(member_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.default)("SELECT id,user_id as userId,username,member_name AS memberName,member_pic AS memberPic,member_role AS memberRole FROM community_members WHERE is_member='t' AND member_name=$1 ", [member_name]);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = CommunityMember;
