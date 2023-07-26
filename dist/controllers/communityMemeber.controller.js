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
exports.getAllMembers = exports.remove = exports.add = void 0;
const CommunityMembers_model_1 = __importDefault(require("./../models/CommunityMembers.model"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const communityMembers = new CommunityMembers_model_1.default();
let responseObj;
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { communityId, userId, username, fullName, profileImg } = req.body;
    if (communityId != null || userId != null || username != null || fullName != null) {
        try {
            const result = yield communityMembers.add({
                community_id: communityId,
                user_id: userId,
                username: username,
                member_name: fullName,
                memeber_pic: profileImg
            });
            responseObj = {
                message: "success",
                data: { data: result },
                errors: [{}]
            };
            res.status(http_status_codes_1.default.OK).json(responseObj);
        }
        catch (error) {
            console.error(error);
            responseObj = {
                message: "faild",
                data: {},
                errors: [{ errorMessage: "Some server Error" }]
            };
            res.status(http_status_codes_1.default.BAD_REQUEST).json(responseObj);
        }
    }
    else {
        responseObj = {
            message: "faild",
            data: {},
            errors: [{ errorMessage: "Invalid Data" }]
        };
        res.status(http_status_codes_1.default.BAD_REQUEST).json(responseObj);
    }
});
exports.add = add;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id !== "") {
        try {
            const result = yield communityMembers.remove(id);
            console.log(result);
            responseObj = {
                message: "sucess",
                data: {},
                errors: []
            };
            res.status(http_status_codes_1.default.OK).json(responseObj);
        }
        catch (error) {
            responseObj = {
                message: "faild",
                data: {},
                errors: [{ errorMessage: "Some server Error" }]
            };
            res.status(http_status_codes_1.default.BAD_REQUEST).json(responseObj);
        }
    }
    else {
        responseObj = {
            message: "faild",
            data: {},
            errors: [{ errorMessage: "Invalid Data" }]
        };
        res.status(http_status_codes_1.default.BAD_REQUEST).json(responseObj);
    }
});
exports.remove = remove;
const getAllMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id !== "") {
        try {
            const result = yield communityMembers.getAllMembers(id);
            console.log(result);
            responseObj = {
                message: "sucess",
                data: { data: result },
                errors: []
            };
            res.status(http_status_codes_1.default.OK).json(responseObj);
        }
        catch (error) {
            responseObj = {
                message: "faild",
                data: {},
                errors: [{ errorMessage: "Invalid Data" }]
            };
            res.status(http_status_codes_1.default.BAD_REQUEST).json(responseObj);
        }
    }
});
exports.getAllMembers = getAllMembers;
