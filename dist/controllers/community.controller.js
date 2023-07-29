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
exports.deleteById = exports.getById = exports.getByName = exports.updateByID = exports.create = void 0;
const Community_model_1 = __importDefault(require("./../models/Community.model"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
//Creating object
const community = new Community_model_1.default();
let responseObject;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { communityData, memberData, tagIds } = req.body;
        const { name, description, bannerImg, profilePic, createdBy, privacyStatus } = communityData;
        const { userId, username, memberName, memberPic } = memberData;
        const result = yield community.create({
            name,
            description,
            banner_image: bannerImg,
            profile_pic: profilePic,
            created_by: createdBy,
            privacy_status: privacyStatus,
        }, {
            user_id: userId,
            username,
            member_name: memberName,
            member_pic: memberPic,
        }, tagIds);
        responseObject = {
            message: "success",
            data: { data: result },
            errors: [{}]
        };
        res.status(http_status_codes_1.default.OK).json(responseObject);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "faild",
            data: {},
            errors: [{ errorMessage: "some server error." }]
        });
    }
});
exports.create = create;
const updateByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield community.deleteById(id);
        responseObject = {
            message: "success",
            data: { data: result },
            errors: [{}]
        };
        res.status(http_status_codes_1.default.OK).json(responseObject);
    }
    catch (error) {
        res.status(501).json({
            message: "faild",
            data: {},
            error: [{ errorMessage: error }]
        });
    }
});
exports.updateByID = updateByID;
const getByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        if (name != "") {
            const result = yield community.getByName(name);
            responseObject = {
                message: "success",
                data: { data: result },
                errors: [{}]
            };
            res.status(200).json(responseObject);
        }
        else {
            res.status(200).json({
                message: "success",
                data: { data: {} },
                error: [{}]
            });
        }
    }
    catch (error) {
        res.status(501).json({
            message: "faild",
            data: {},
            error: [{ errorMessage: error }]
        });
    }
});
exports.getByName = getByName;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (id != "") {
            const result = yield community.getById(id);
            res.status(200).json({
                message: "success",
                data: { data: result },
                error: [{}]
            });
        }
        else {
            res.status(200).json({
                message: "success",
                data: { data: {} },
                error: [{}]
            });
        }
    }
    catch (error) {
        res.status(501).json({
            message: "faild",
            data: {},
            error: [{ errorMessage: error }]
        });
    }
});
exports.getById = getById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield community.deleteById(id);
        res.status(200).json({
            message: "success",
            data: result,
            error: {}
        });
    }
    catch (error) {
        res.status(501).json({
            message: "faild",
            data: {},
            error: [{ errorMessage: error }]
        });
        console.trace(error);
    }
});
exports.deleteById = deleteById;
