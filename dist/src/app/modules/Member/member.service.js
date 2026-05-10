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
exports.MemberServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createMember = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.create({
        data: payload,
    });
    return result;
});
const getAllMembers = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, memberType, sportCategory, status, page = 1, limit = 12 } = filters;
    const skip = (page - 1) * limit;
    const where = {};
    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { role: { contains: search, mode: "insensitive" } },
            { institution: { contains: search, mode: "insensitive" } },
        ];
    }
    if (memberType && memberType !== "ALL") {
        where.memberType = memberType;
    }
    if (sportCategory && sportCategory !== "ALL") {
        where.sportCategory = sportCategory;
    }
    if (status) {
        where.status = status;
    }
    const [members, total] = yield Promise.all([
        prisma_1.default.member.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.default.member.count({ where }),
    ]);
    return {
        data: members,
        meta: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit),
        },
    };
});
const getSingleMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield prisma_1.default.member.findUnique({
        where: { id },
        include: {
            user: true,
            achievements_rel: true,
        },
    });
    if (!member) {
        throw new ApiError_1.default(http_status_codes_1.default.NOT_FOUND, "Member not found");
    }
    return member;
});
const updateMember = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingMember = yield prisma_1.default.member.findUnique({
        where: { id },
    });
    if (!existingMember) {
        throw new ApiError_1.default(http_status_codes_1.default.NOT_FOUND, "Member not found");
    }
    const result = yield prisma_1.default.member.update({
        where: { id },
        data: payload,
    });
    return result;
});
const deleteMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield prisma_1.default.member.findUnique({
        where: { id },
    });
    if (!member) {
        throw new ApiError_1.default(http_status_codes_1.default.NOT_FOUND, "Member not found");
    }
    yield prisma_1.default.member.delete({
        where: { id },
    });
    return null;
});
const getStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const [faculty, students, athletes, achievements] = yield Promise.all([
        prisma_1.default.member.count({ where: { memberType: "FACULTY", status: "ACTIVE" } }),
        prisma_1.default.member.count({ where: { memberType: "STUDENT", status: "ACTIVE" } }),
        prisma_1.default.member.count({ where: { memberType: "ATHLETE", status: "ACTIVE" } }),
        prisma_1.default.achievement.count(),
    ]);
    return {
        faculty,
        students,
        athletes,
        achievements,
        totalMembers: faculty + students + athletes,
    };
});
const getFaculty = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.member.findMany({
        where: { memberType: "FACULTY", status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
    });
});
const getStudents = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sportCategory, page = 1, limit = 12 } = filters;
    const skip = (page - 1) * limit;
    const where = {
        memberType: { in: ["STUDENT", "ATHLETE", "CAPTAIN", "ALUMNI"] },
        status: "ACTIVE",
    };
    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { role: { contains: search, mode: "insensitive" } },
        ];
    }
    if (sportCategory && sportCategory !== "ALL") {
        where.sportCategory = sportCategory;
    }
    const [members, total] = yield Promise.all([
        prisma_1.default.member.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.default.member.count({ where }),
    ]);
    return {
        data: members,
        meta: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit),
        },
    };
});
const getAchievements = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.achievement.findMany({
        orderBy: { year: "desc" },
        include: { member: true },
    });
});
const createAchievement = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.achievement.create({
        data: payload,
    });
});
const updateAchievement = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.achievement.update({
        where: { id },
        data: payload,
    });
});
const deleteAchievement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.achievement.delete({
        where: { id },
    });
    return null;
});
exports.MemberServices = {
    createMember,
    getAllMembers,
    getSingleMember,
    updateMember,
    deleteMember,
    getStats,
    getFaculty,
    getStudents,
    getAchievements,
    createAchievement,
    updateAchievement,
    deleteAchievement,
};
