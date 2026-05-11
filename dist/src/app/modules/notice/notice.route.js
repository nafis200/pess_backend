"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const notice_controller_1 = require("./notice.controller");
const router = express_1.default.Router();
router.post("/create-notice", notice_controller_1.NoticeController.createNotice);
router.get("/", notice_controller_1.NoticeController.getAllNotices);
router.get("/:id", notice_controller_1.NoticeController.getSingleNotice);
router.delete("/:id", notice_controller_1.NoticeController.deleteNotice);
exports.NoticeRoutes = router;
