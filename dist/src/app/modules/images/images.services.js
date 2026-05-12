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
exports.ImageService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const fileUploader_1 = require("../../helper/fileUploader");
const uploadImages = (files) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadResults = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
        return prisma_1.default.image.create({
            data: {
                name: file.originalname,
                size: file.size,
                mimetype: file.mimetype,
                url: result === null || result === void 0 ? void 0 : result.secure_url,
                publicId: result === null || result === void 0 ? void 0 : result.public_id,
            },
        });
    })));
    return uploadResults;
});
const getAllImages = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.image.findMany();
});
const getSingleImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.image.findUnique({ where: { id } });
});
const deleteImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield prisma_1.default.image.findUnique({ where: { id } });
    if (image) {
        yield fileUploader_1.fileUploader.removeFromCloudinary(image.publicId);
        return yield prisma_1.default.image.delete({ where: { id } });
    }
    throw new Error("Image not found");
});
exports.ImageService = {
    uploadImages,
    getAllImages,
    getSingleImage,
    deleteImage,
};
