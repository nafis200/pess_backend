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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeService = void 0;
const paginationHelper_1 = require("../../helper/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createNotice = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.notice.create({
        data,
    });
    return result;
});
const getAllNotices = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationResult = paginationHelper_1.paginationHelper.calculatePagination(options);
    const limit = Number(paginationResult.limit) || 10;
    const skip = Number(paginationResult.skip) || 0;
    const page = Number(paginationResult.page) || 1;
    const sortBy = paginationResult.sortBy || 'createdAt';
    const sortOrder = paginationResult.sortOrder || 'desc';
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: [
                { title: { contains: search } },
                { description: { contains: search } }
            ]
        });
    }
    if (filterData.category) {
        andConditions.push({ category: filterData.category });
    }
    if (filterData.isPublished !== undefined) {
        andConditions.push({ isPublished: filterData.isPublished === 'true' });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.notice.findMany({
        where: whereConditions,
        skip: skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });
    const total = yield prisma_1.default.notice.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSingleNotice = (idOrSlug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.notice.findFirst({
        where: {
            OR: [
                { id: idOrSlug },
                { slug: idOrSlug }
            ]
        },
    });
    return result;
});
const updateNotice = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.notice.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteNotice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.notice.delete({
        where: {
            id,
        },
    });
    return result;
});
const togglePublishStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const notice = yield prisma_1.default.notice.findUnique({
        where: { id }
    });
    if (!notice) {
        throw new Error("Notice not found");
    }
    const result = yield prisma_1.default.notice.update({
        where: {
            id,
        },
        data: {
            isPublished: !notice.isPublished
        },
    });
    return result;
});
exports.NoticeService = {
    createNotice,
    getAllNotices,
    getSingleNotice,
    updateNotice,
    deleteNotice,
    togglePublishStatus
};
