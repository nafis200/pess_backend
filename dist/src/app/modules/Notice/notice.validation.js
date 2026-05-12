"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeValidation = void 0;
const zod_1 = require("zod");
const createNotice = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    publishDate: zod_1.z.string().optional(),
    isPublished: zod_1.z.string().optional().transform((val) => val === 'true'),
});
const updateNotice = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    publishDate: zod_1.z.string().optional(),
    isPublished: zod_1.z.string().optional().transform((val) => val === 'true'),
});
exports.NoticeValidation = {
    createNotice,
    updateNotice,
};
