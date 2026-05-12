"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const createBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required").max(255),
        slug: zod_1.z.string().max(255).optional(),
        shortDescription: zod_1.z.string().optional(),
        content: zod_1.z.string().min(1, "Content is required"),
        featuredImage: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        status: zod_1.z.enum(["DRAFT", "PUBLISHED"]).optional(),
        seoMetaTitle: zod_1.z.string().max(160).optional(),
        seoMetaDescription: zod_1.z.string().max(320).optional(),
    }),
});
const updateBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).max(255).optional(),
        slug: zod_1.z.string().max(255).optional(),
        shortDescription: zod_1.z.string().optional(),
        content: zod_1.z.string().min(1).optional(),
        featuredImage: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        status: zod_1.z.enum(["DRAFT", "PUBLISHED"]).optional(),
        seoMetaTitle: zod_1.z.string().max(160).optional(),
        seoMetaDescription: zod_1.z.string().max(320).optional(),
    }),
});
exports.BlogValidation = {
    createBlogValidation,
    updateBlogValidation,
};
