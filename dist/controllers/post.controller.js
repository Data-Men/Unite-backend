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
exports.getPostById = exports.deletePost = exports.createPost = void 0;
const CommunityPost_model_1 = __importDefault(require("./../models/CommunityPost.model"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const post = new CommunityPost_model_1.default();
let responseObj;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const { caption, media, tags, community_id, member_id } = req.body;
    if (community_id != null && member_id != null) {
        try {
            const result = yield post.createPost({
                caption, media, tags, community_id, member_id
            });
            // console.log(result);
            responseObj = {
                message: "success",
                data: { data: result },
                errors: [{}]
            };
            res.status(http_status_codes_1.default.OK).json(responseObj);
        }
        catch (error) {
            // console.error(error);
            responseObj = {
                message: "faild",
                data: {},
                errors: [{ errorMessage: "Some server Error" }]
            };
            res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json(responseObj);
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
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    if (typeof postId == "string" && postId != "") {
        try {
            const result = yield post.deletePost(postId);
            if (result) {
                responseObj = {
                    message: "success",
                    data: {},
                    errors: [{}]
                };
                res.status(http_status_codes_1.default.OK).json(responseObj);
            }
            else {
                responseObj = {
                    message: "faild",
                    data: {},
                    errors: [{ errorMessage: "Post Does Not Exist" }]
                };
                res.status(http_status_codes_1.default.NOT_FOUND).json(responseObj);
            }
        }
        catch (error) {
            // console.error(error);
            responseObj = {
                message: "faild",
                data: {},
                errors: [{ errorMessage: "Some server Error" }]
            };
            res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json(responseObj);
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
exports.deletePost = deletePost;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    if (typeof postId == "string" && postId != "") {
        try {
            const result = yield post.getById(postId);
            if (result) {
                responseObj = {
                    message: "success",
                    data: { data: result },
                    errors: [{}]
                };
                res.status(http_status_codes_1.default.OK).json(responseObj);
            }
            else {
                responseObj = {
                    message: "faild",
                    data: {},
                    errors: [{ errorMessage: "No Such Post Exists" }]
                };
                res.status(http_status_codes_1.default.NOT_FOUND).json(responseObj);
            }
        }
        catch (error) {
            console.error(error);
            responseObj = {
                message: "faild",
                data: {},
                errors: [{ errorMessage: "Some server Error" }]
            };
            res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json(responseObj);
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
exports.getPostById = getPostById;
