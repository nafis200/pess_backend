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
exports.CommentRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const router = (0, express_1.Router)({ mergeParams: true });
router.get("/", (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = Number(req.params.blogId);
    const comments = yield prisma_1.default.comment.findMany({
        where: { blogId, parentId: null },
        include: {
            replies: {
                include: { replies: true },
                orderBy: { createdAt: "asc" },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ success: true, data: comments });
})));
router.post("/", (0, auth_1.default)("USER", "PREMIUM_USER", "ADMIN"), (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blogId = Number(req.params.blogId);
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { content, parentId } = req.body;
    const user = yield prisma_1.default.user.findUnique({ where: { id: userId } });
    const comment = yield prisma_1.default.comment.create({
        data: {
            blogId,
            name: (user === null || user === void 0 ? void 0 : user.name) || "Anonymous",
            email: (user === null || user === void 0 ? void 0 : user.email) || "",
            content,
            parentId: parentId || null,
        },
    });
    res.status(201).json({ success: true, data: comment });
})));
router.post("/:commentId/replies", (0, auth_1.default)("USER", "PREMIUM_USER", "ADMIN"), (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blogId = Number(req.params.blogId);
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { content } = req.body;
    const commentId = Number(req.params.commentId);
    const user = yield prisma_1.default.user.findUnique({ where: { id: userId } });
    const reply = yield prisma_1.default.comment.create({
        data: {
            blogId,
            parentId: commentId,
            name: (user === null || user === void 0 ? void 0 : user.name) || "Anonymous",
            email: (user === null || user === void 0 ? void 0 : user.email) || "",
            content,
        },
    });
    res.status(201).json({ success: true, data: reply });
})));
router.delete("/:commentId", (0, auth_1.default)("USER", "PREMIUM_USER", "ADMIN"), (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = Number(req.params.commentId);
    yield prisma_1.default.comment.delete({ where: { id: commentId } });
    res.status(200).json({ success: true });
})));
exports.CommentRoutes = router;
