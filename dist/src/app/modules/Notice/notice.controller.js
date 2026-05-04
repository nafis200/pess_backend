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
exports.NoticeController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const notice_service_1 = require("./notice.service");
const config_1 = __importDefault(require("../../config"));
const createNotice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    let pdfUrl = '';
    if (file) {
        // Ensure backend_url is not undefined
        const baseUrl = config_1.default.backend_url || 'http://localhost:5000';
        pdfUrl = `${baseUrl}/uploads/${file.filename}`;
    }
    const slug = req.body.title.toLowerCase().split(' ').join('-') + '-' + Date.now();
    const data = Object.assign(Object.assign({}, req.body), { pdfUrl,
        slug, publishDate: req.body.publishDate ? new Date(req.body.publishDate) : new Date(), isPublished: req.body.isPublished === 'true' || req.body.isPublished === true });
    const result = yield notice_service_1.NoticeService.createNotice(data);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.CREATED,
        success: true,
        message: 'Notice created successfully',
        data: result,
    });
}));
const getAllNotices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['search', 'category', 'isPublished']);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield notice_service_1.NoticeService.getAllNotices(filters, options);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Notices fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleNotice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield notice_service_1.NoticeService.getSingleNotice(id);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Notice fetched successfully',
        data: result,
    });
}));
const updateNotice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const file = req.file;
    let updateData = Object.assign({}, req.body);
    if (file) {
        const baseUrl = config_1.default.backend_url || 'http://localhost:5000';
        updateData.pdfUrl = `${baseUrl}/uploads/${file.filename}`;
    }
    if (updateData.title) {
        updateData.slug = updateData.title.toLowerCase().split(' ').join('-') + '-' + Date.now();
    }
    if (updateData.publishDate) {
        updateData.publishDate = new Date(updateData.publishDate);
    }
    if (updateData.isPublished !== undefined) {
        updateData.isPublished = updateData.isPublished === 'true' || updateData.isPublished === true;
    }
    const result = yield notice_service_1.NoticeService.updateNotice(id, updateData);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Notice updated successfully',
        data: result,
    });
}));
const deleteNotice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield notice_service_1.NoticeService.deleteNotice(id);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Notice deleted successfully',
        data: result,
    });
}));
const togglePublishStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield notice_service_1.NoticeService.togglePublishStatus(id);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Notice status updated successfully',
        data: result,
    });
}));
exports.NoticeController = {
    createNotice,
    getAllNotices,
    getSingleNotice,
    updateNotice,
    deleteNotice,
    togglePublishStatus
};
