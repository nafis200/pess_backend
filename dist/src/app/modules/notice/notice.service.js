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
exports.NoticeService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createNotice = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const title = ((_a = payload.title) === null || _a === void 0 ? void 0 : _a.trim()) || ((_b = payload['title ']) === null || _b === void 0 ? void 0 : _b.trim()) || "";
    const description = ((_c = payload.description) === null || _c === void 0 ? void 0 : _c.trim()) || ((_d = payload['description ']) === null || _d === void 0 ? void 0 : _d.trim()) || "";
    const noticeDate = ((_e = payload.noticeDate) === null || _e === void 0 ? void 0 : _e.trim()) || ((_f = payload['noticeDate ']) === null || _f === void 0 ? void 0 : _f.trim()) || "";
    if (!title) {
        throw new Error("Title is required");
    }
    if (!noticeDate) {
        throw new Error("Notice date is required");
    }
    const result = yield prisma_1.default.notice.create({
        data: {
            title,
            description: description || null,
            noticeDate: new Date(noticeDate)
        },
    });
    return result;
});
const getAllNotices = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.notice.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
});
const getSingleNotice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.notice.findUnique({
        where: { id },
    });
});
const deleteNotice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const notice = yield prisma_1.default.notice.findUnique({
        where: { id },
    });
    if (!notice) {
        throw new Error("Notice not found");
    }
    return prisma_1.default.notice.delete({
        where: { id },
    });
});
exports.NoticeService = {
    createNotice,
    getAllNotices,
    getSingleNotice,
    deleteNotice,
};
