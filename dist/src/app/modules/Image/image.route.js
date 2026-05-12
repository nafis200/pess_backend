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
exports.ImageRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const fileUploader_1 = require("../../helper/fileUploader");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const router = (0, express_1.Router)();
router.get("/", (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gallery = yield prisma_1.default.imageGallery.findFirst();
    if (!gallery || !gallery.images) {
        return res.status(200).json({
            success: true,
            data: [],
        });
    }
    const images = gallery.images.map((url, index) => ({
        id: `${gallery.id}-${index}`,
        url: url,
    }));
    res.status(200).json({
        success: true,
        data: images,
    });
})));
router.get("/admin", (0, auth_1.default)("ADMIN"), (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gallery = yield prisma_1.default.imageGallery.findFirst();
    if (!gallery || !gallery.images) {
        return res.status(200).json({
            success: true,
            data: [],
        });
    }
    const images = gallery.images.map((url, index) => ({
        id: `${gallery.id}-${index}`,
        url: url,
        name: url.split('/').pop() || 'image',
    }));
    res.status(200).json({
        success: true,
        data: images,
    });
})));
router.delete("/:id", (0, auth_1.default)("ADMIN"), (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const parts = id.split('-');
    const index = parseInt(parts[parts.length - 1]);
    const gallery = yield prisma_1.default.imageGallery.findFirst();
    if (!gallery) {
        return res.status(404).json({
            success: false,
            message: "Gallery not found",
        });
    }
    if (isNaN(index) || index < 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid image index",
        });
    }
    const images = [...gallery.images];
    if (index >= 0 && index < images.length) {
        images.splice(index, 1);
    }
    else {
        return res.status(404).json({
            success: false,
            message: "Image not found",
        });
    }
    yield prisma_1.default.imageGallery.update({
        where: { id: gallery.id },
        data: { images },
    });
    res.status(200).json({
        success: true,
        message: "Image deleted",
    });
})));
router.post("/upload", (0, auth_1.default)("ADMIN"), (req, res, next) => {
    fileUploader_1.fileUploader.upload.array("files")(req, res, (err) => {
        if (err) {
            console.error("Multer error:", err);
            return res.status(400).json({
                success: false,
                message: err.message || "File upload error",
            });
        }
        next();
    });
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Uploading files...", req.files);
        if (!req.files || !req.files.length) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        const files = req.files;
        const uploadedUrls = [];
        for (const file of files) {
            const result = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
            if (result === null || result === void 0 ? void 0 : result.secure_url) {
                uploadedUrls.push(result.secure_url);
            }
        }
        // Save to ImageGallery
        let gallery = yield prisma_1.default.imageGallery.findFirst();
        if (gallery) {
            const existingImages = gallery.images || [];
            yield prisma_1.default.imageGallery.update({
                where: { id: gallery.id },
                data: { images: [...existingImages, ...uploadedUrls] },
            });
        }
        else {
            yield prisma_1.default.imageGallery.create({
                data: { images: uploadedUrls },
            });
        }
        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            data: files.map((file, idx) => ({
                name: file.originalname,
                size: file.size,
                mimetype: file.mimetype,
                url: uploadedUrls[idx] || "",
            })),
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Upload failed",
        });
    }
}));
exports.ImageRoutes = router;
