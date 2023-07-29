"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const community_controller_1 = require("./../controllers/community.controller");
const router = express_1.default.Router();
router.post('/', community_controller_1.create);
router.get('/search/:name', community_controller_1.getByName);
router.get('/:id', community_controller_1.getById);
router.put('/:id', community_controller_1.updateByID);
router.delete('/:id', community_controller_1.deleteById);
exports.default = router;
