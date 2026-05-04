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
exports.ReactionRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const router = (0, express_1.Router)({ mergeParams: true });
const REACTION_TYPES = ["love", "like", "clap", "inspiring", "insightful"];
router.get("/", (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = Number(req.params.blogId);
    const reactions = yield Promise.all(REACTION_TYPES.map((type) => __awaiter(void 0, void 0, void 0, function* () {
        const count = yield prisma_1.default.reaction.count({
            where: { blogId, type },
        });
        return { type, count, hasReacted: false };
    })));
    res.status(200).json({ success: true, data: reactions });
})));
router.post("/", (0, auth_1.default)("USER", "PREMIUM_USER", "ADMIN"), (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blogId = Number(req.params.blogId);
    const { type } = req.body;
    const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
    const existingReaction = yield prisma_1.default.reaction.findFirst({
        where: { blogId, userId },
    });
    if (existingReaction) {
        if (existingReaction.type === type) {
            yield prisma_1.default.reaction.delete({ where: { id: existingReaction.id } });
        }
        else {
            yield prisma_1.default.reaction.update({
                where: { id: existingReaction.id },
                data: { type },
            });
        }
    }
    else {
        yield prisma_1.default.reaction.create({
            data: {
                blogId,
                type,
                userId: String(userId),
            },
        });
    }
    const reactions = yield Promise.all(REACTION_TYPES.map((rType) => __awaiter(void 0, void 0, void 0, function* () {
        const count = yield prisma_1.default.reaction.count({
            where: { blogId, type: rType },
        });
        return { type: rType, count, hasReacted: false };
    })));
    res.status(200).json({ success: true, data: reactions });
})));
exports.ReactionRoutes = router;
