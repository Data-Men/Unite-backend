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
class Tag {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, category } = data;
                const result = yield (0, db_1.default)("INSERT INTO tags (name,category) VALUES ($1,$2) RETURNING id,name", [name, category]);
                return result;
            }
            catch (error) {
                console.log("Error While Creating Tag");
                console.log(error);
                return [];
            }
        });
    }
    createMany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const len = data.length;
                //how to create more than one record at once           
            }
            catch (error) {
            }
        });
    }
    getAllTags() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.default)('SELECT id,name,tag_color as "color" FROM tags;');
                return result;
            }
            catch (error) {
                throw new Error("some error");
            }
        });
    }
    searchTag(tagName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.default)("SELECT id,name,tag_color as color FROM tags where name ILIKE $1", [`${tagName}%`]);
                console.log(result);
                return result;
            }
            catch (error) {
                throw new Error("some error");
            }
        });
    }
    getTagById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.default)('SELECT id,name,tag_color as "color" FROM tags where name=$1', [id]);
                return result;
            }
            catch (error) {
                throw new Error("some error");
            }
        });
    }
    getAllExcept(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.default)(`SELECT id,name,tag_color as "color" FROM tags where id not in (${ids})`);
                return result;
            }
            catch (error) {
                console.log(error);
                throw new Error("some error");
            }
        });
    }
}
exports.default = Tag;
