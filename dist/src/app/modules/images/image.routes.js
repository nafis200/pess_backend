"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const image_controller_1 = require("./image.controller");
const fileUploader_1 = require("../../helper/fileUploader");
const router = express_1.default.Router();
router.post('/upload', fileUploader_1.fileUploader.upload.array('files'), image_controller_1.ImageController.uploadImages);
router.get('/', image_controller_1.ImageController.getAllImages);
router.get('/:id', image_controller_1.ImageController.getSingleImage);
router.delete('/:id', image_controller_1.ImageController.deleteImage);
exports.ImageRoutes = router;
