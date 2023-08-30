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
exports.getAllExcept = exports.getAllTags = exports.searchTag = exports.create = void 0;
const Tags_model_1 = __importDefault(require("./../models/Tags.model"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const tag = new Tags_model_1.default();
let responseObj;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name, category } = req.body;
    if (name != null || category != null) {
        try {
            const result = yield tag.create({
                name,
                category
            });
            console.log(result);
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
exports.create = create;
const searchTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tagName } = req.params;
    if (tagName !== "") {
        try {
            const result = yield tag.searchTag(tagName);
            responseObj = {
                message: "success",
                data: { data: result },
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
exports.searchTag = searchTag;
const getAllTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tag.getAllTags();
        responseObj = {
            message: "success",
            data: { data: result },
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
});
exports.getAllTags = getAllTags;
const getAllExcept = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    try {
        if (ids.every((id) => typeof id === 'number')) {
            const result = yield tag.getAllExcept(ids);
            responseObj = {
                message: "success",
                data: { data: result },
                errors: []
            };
            res.status(http_status_codes_1.default.OK).json(responseObj);
        }
        else {
            throw new Error("Type error");
        }
    }
    catch (error) {
        responseObj = {
            message: "faild",
            data: {},
            errors: [{ errorMessage: "Some server Error" }]
        };
        res.status(http_status_codes_1.default.BAD_REQUEST).json(responseObj);
    }
});
exports.getAllExcept = getAllExcept;
