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
class User {
    constructor(user_id, user_name, name, mobile_number, email) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.name = name;
        this.mobile_number = mobile_number;
        this.email = email;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * creating user
             * @param  user_name    -unique name assigned to a user
             * @param  name         -name
             * @param  mobile_number    -user mobile number
             * @param  email
             */
            const parameters = [this.user_name, this.name, this.mobile_number, this.email];
            try {
                const q = yield (0, db_1.default)("INSERT INTO user (user_name,name,mobile,email) VALUES ($1,$2,$3,$4)", parameters);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    userById() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Object({});
            }
            catch (error) {
            }
        });
    }
}
exports.default = User;
