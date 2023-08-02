"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("./../controllers/post.controller");
const router = express_1.default.Router();
router.post('/', post_controller_1.createPost);
//to get individual post by its id
router.get(`/:postId`, post_controller_1.getPostById);
router.delete('/:postId', post_controller_1.deletePost);
exports.default = router;
