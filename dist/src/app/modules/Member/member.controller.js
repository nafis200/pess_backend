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
exports.MemberControllers = void 0;
const member_service_1 = require("./member.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberServices.createMember(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 201,
        message: "Member created successfully",
        data: result,
    });
}));
const getAllMembers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {
        search: req.query.search,
        memberType: req.query.memberType,
        sportCategory: req.query.sportCategory,
        status: req.query.status,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 12,
    };
    const result = yield member_service_1.MemberServices.getAllMembers(filters);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Members retrieved successfully",
        data: result.data,
    });
    res.meta = result.meta;
}));
const getSingleMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberServices.getSingleMember(Number(req.params.id));
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Member retrieved successfully",
        data: result,
    });
}));
const updateMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberServices.updateMember(Number(req.params.id), req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Member updated successfully",
        data: result,
    });
}));
const deleteMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield member_service_1.MemberServices.deleteMember(Number(req.params.id));
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Member deleted successfully",
        data: null,
    });
}));
const getStats = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberServices.getStats();
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Stats retrieved successfully",
        data: result,
    });
}));
const getFaculty = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberServices.getFaculty();
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Faculty retrieved successfully",
        data: result,
    });
}));
const getStudents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {
        search: req.query.search,
        sportCategory: req.query.sportCategory,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 12,
    };
    const result = yield member_service_1.MemberServices.getStudents(filters);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Students retrieved successfully",
        data: result.data,
    });
    res.meta = result.meta;
}));
const getAchievements = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberServices.getAchievements();
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Achievements retrieved successfully",
        data: result,
    });
}));
const createAchievement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberServices.createAchievement(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 201,
        message: "Achievement created successfully",
        data: result,
    });
}));
const updateAchievement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberServices.updateAchievement(Number(req.params.id), req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Achievement updated successfully",
        data: result,
    });
}));
const deleteAchievement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield member_service_1.MemberServices.deleteAchievement(Number(req.params.id));
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Achievement deleted successfully",
        data: null,
    });
}));
exports.MemberControllers = {
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
