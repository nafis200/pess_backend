"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const notice_controller_1 = require("./notice.controller");
const fileUploader_1 = require("../../helper/fileUploader");
const notice_validation_1 = require("./notice.validation");
const router = express_1.default.Router();
router.get('/', notice_controller_1.NoticeController.getAllNotices);
router.get('/:id', notice_controller_1.NoticeController.getSingleNotice);
router.post('/', fileUploader_1.fileUploader.upload.single('pdf'), (req, res, next) => {
    req.body = notice_validation_1.NoticeValidation.createNotice.parse(req.body);
    return notice_controller_1.NoticeController.createNotice(req, res, next);
});
router.put('/:id', fileUploader_1.fileUploader.upload.single('pdf'), (req, res, next) => {
    req.body = notice_validation_1.NoticeValidation.updateNotice.parse(req.body);
    return notice_controller_1.NoticeController.updateNotice(req, res, next);
});
router.patch('/:id/publish', notice_controller_1.NoticeController.togglePublishStatus);
router.delete('/:id', notice_controller_1.NoticeController.deleteNotice);
exports.NoticeRoutes = router;
