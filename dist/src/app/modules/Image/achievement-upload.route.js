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
exports.AchievementUploadRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const fileUploader_1 = require("../../helper/fileUploader");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const router = (0, express_1.Router)();
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
router.post("/achievement", (0, auth_1.default)("ADMIN"), (req, res, next) => {
    fileUploader_1.fileUploader.upload.single("image")(req, res, (err) => {
        if (err) {
            console.error("Multer error:", err);
            const statusCode = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
            return res.status(statusCode).json({
                success: false,
                message: err.message || "File upload error",
                code: err.code,
            });
        }
        next();
    });
}, (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        const file = req.file;
        if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
            return res.status(400).json({
                success: false,
                message: "Invalid file type. Allowed types: JPG, PNG, WEBP",
                code: "INVALID_FILE_TYPE",
            });
        }
        const result = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
        if (!(result === null || result === void 0 ? void 0 : result.secure_url)) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload image to cloud storage",
            });
        }
        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            data: {
                url: result.secure_url,
                publicId: result.public_id,
                format: result.format,
                width: result.width,
                height: result.height,
            },
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Upload failed",
        });
    }
})));
exports.AchievementUploadRoutes = router;
