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
exports.ReactionRoutes = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const REACTION_TYPES = ["love", "like", "clap", "inspiring", "insightful"];
// Get reactions for a blog
router.get("/:blogId/reactions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.params;
        const blogIdNum = Number(blogId);
        const reactions = yield Promise.all(REACTION_TYPES.map((type) => __awaiter(void 0, void 0, void 0, function* () {
            const count = yield prisma.reaction.count({
                where: { blogId: blogIdNum, type },
            });
            return { type, count, hasReacted: false };
        })));
        res.json({ success: true, data: reactions });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch reactions" });
    }
}));
// Toggle reaction
router.post("/:blogId/reactions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.params;
        const { type } = req.body;
        // For now, just create/update without user tracking
        const reaction = yield prisma.reaction.create({
            data: {
                blogId: Number(blogId),
                type,
            },
        });
        const reactions = yield Promise.all(REACTION_TYPES.map((rType) => __awaiter(void 0, void 0, void 0, function* () {
            const count = yield prisma.reaction.count({
                where: { blogId: Number(blogId), type: rType },
            });
            return { type: rType, count, hasReacted: rType === type };
        })));
        res.json({ success: true, data: reactions });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to toggle reaction" });
    }
}));
exports.ReactionRoutes = router;
