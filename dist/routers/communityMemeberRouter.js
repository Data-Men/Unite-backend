"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const communityMemeber_controller_1 = require("./../controllers/communityMemeber.controller");
const router = express_1.default.Router();
router.post('/', communityMemeber_controller_1.add);
router.get('/:id', communityMemeber_controller_1.getAllMembers);
router.delete('/:id', communityMemeber_controller_1.remove);
exports.default = router;
