"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tag_controller_1 = require("./../controllers/tag.controller");
const router = express_1.default.Router();
router.post('/', tag_controller_1.create);
router.get('/', tag_controller_1.getAllTags);
router.get('/:tagName', tag_controller_1.searchTag);
exports.default = router;
