"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const video_controller_1 = require("./video.controller");
const router = express_1.default.Router();
router.get('/', video_controller_1.VideoController.getAllVideos);
router.get('/:id', video_controller_1.VideoController.getSingleVideo);
router.post('/add-video', video_controller_1.VideoController.insertVideo);
router.delete('/:id', video_controller_1.VideoController.deleteVideo);
exports.VideoRoutes = router;
