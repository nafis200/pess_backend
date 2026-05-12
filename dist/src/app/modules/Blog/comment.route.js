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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
// Get comments for a blog
router.get("/:blogId/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.params;
        const comments = yield prisma.comment.findMany({
            where: { blogId: Number(blogId), parentId: null },
            include: {
                replies: {
                    include: { replies: true },
                    orderBy: { createdAt: "asc" },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        res.json({ success: true, data: comments });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch comments" });
    }
}));
// Create comment
router.post("/:blogId/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.params;
        const { name, email, content, parentId } = req.body;
        const comment = yield prisma.comment.create({
            data: {
                blogId: Number(blogId),
                name,
                email,
                content,
                parentId: parentId || null,
            },
        });
        res.json({ success: true, data: comment });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to create comment" });
    }
}));
// Reply to comment
router.post("/:blogId/comments/:commentId/replies", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId, commentId } = req.params;
        const { name, email, content } = req.body;
        const reply = yield prisma.comment.create({
            data: {
                blogId: Number(blogId),
                parentId: Number(commentId),
                name,
                email,
                content,
            },
        });
        res.json({ success: true, data: reply });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to create reply" });
    }
}));
// Delete comment
router.delete("/:blogId/comments/:commentId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        yield prisma.comment.delete({ where: { id: Number(commentId) } });
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to delete comment" });
    }
}));
exports.CommentRoutes = router;
