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
class Community {
    create(createData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, privacy_status, banner_image, profile_pic, created_by } = createData;
                console.log(createData);
                const sql = `INSERT INTO communities (name,description,profile_pic,banner_img,privacy_status,created_by,created_at) VALUES ($1,$2,$3,$4,$5,$6,NOW()) RETURNING id,name,description,profile_pic,banner_img,privacy_status,created_by,created_at ;`;
                const result = yield (0, db_1.default)(sql, [name, description, profile_pic, banner_image, privacy_status, created_by]);
                console.log(result);
                return result;
            }
            catch (error) {
                console.trace(error);
                return false;
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
                const result = yield (0, db_1.default)(`SELECT * FROM communities WHERE name `);
                return result;
            }
            catch (error) {
                return [];
            }
        });
    }
}
exports.default = Community;
