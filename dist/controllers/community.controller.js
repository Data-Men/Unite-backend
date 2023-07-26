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
exports.deleteById = exports.updateByID = exports.create = void 0;
const Community_model_1 = __importDefault(require("./../models/Community.model"));
//Creating object
const community = new Community_model_1.default();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let responseObj;
    try {
        const { name, description, created_by, privacy_status } = req.body;
        const result = yield community.create({
            name,
            created_by,
            description,
            privacy_status,
        });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(501).json({
            message: "faild",
            data: {},
            error: [{ errorMessage: error }]
        });
    }
});
exports.create = create;
const updateByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
});
exports.updateByID = updateByID;
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
