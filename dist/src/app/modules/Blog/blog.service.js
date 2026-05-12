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
exports.BlogServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const generateSlug = (title) => {
    return (title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
        "-" +
        Date.now().toString(36));
};
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = payload.slug || generateSlug(payload.title);
    const existingBlog = yield prisma_1.default.blog.findUnique({
        where: { slug },
    });
    const finalSlug = existingBlog ? `${slug}-${Date.now()}` : slug;
    const result = yield prisma_1.default.blog.create({
        data: {
            title: payload.title,
            slug: finalSlug,
            shortDescription: payload.shortDescription,
            content: payload.content,
            featuredImage: payload.featuredImage,
            category: payload.category,
            tags: payload.tags || [],
            status: payload.status || "DRAFT",
            seoMetaTitle: payload.seoMetaTitle,
            seoMetaDescription: payload.seoMetaDescription,
        },
    });
    return result;
});
const getAllBlogs = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, status, category, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;
    const where = {};
    if (search) {
        where.OR = [
            { title: { contains: search, mode: "insensitive" } },
            { shortDescription: { contains: search, mode: "insensitive" } },
        ];
    }
    if (status && (status === "PUBLISHED" || status === "DRAFT")) {
        where.status = status;
    }
    if (category) {
        where.category = category;
    }
    const [blogs, total] = yield Promise.all([
        prisma_1.default.blog.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: { author: true },
        }),
        prisma_1.default.blog.count({ where }),
    ]);
    const blogsWithAuthor = blogs.map(blog => {
        var _a, _b;
        return (Object.assign(Object.assign({}, blog), { authorName: ((_a = blog.author) === null || _a === void 0 ? void 0 : _a.name) || "Admin", authorImage: ((_b = blog.author) === null || _b === void 0 ? void 0 : _b.profilePhoto) || null }));
    });
    return {
        data: blogsWithAuthor,
        meta: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit),
        },
    };
});
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const blog = yield prisma_1.default.blog.findUnique({
        where: { id },
        include: { author: true },
    });
    if (!blog) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
    }
    return Object.assign(Object.assign({}, blog), { authorName: ((_a = blog.author) === null || _a === void 0 ? void 0 : _a.name) || "FitNest Admin", authorImage: ((_b = blog.author) === null || _b === void 0 ? void 0 : _b.profilePhoto) || null });
});
const getBlogBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const blog = yield prisma_1.default.blog.findUnique({
        where: { slug },
        include: { author: true },
    });
    if (!blog) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
    }
    return Object.assign(Object.assign({}, blog), { authorName: ((_a = blog.author) === null || _a === void 0 ? void 0 : _a.name) || "FitNest Admin", authorImage: ((_b = blog.author) === null || _b === void 0 ? void 0 : _b.profilePhoto) || null });
});
const updateBlog = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingBlog = yield prisma_1.default.blog.findUnique({
        where: { id },
    });
    if (!existingBlog) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
    }
    if (payload.slug && payload.slug !== existingBlog.slug) {
        const slugExists = yield prisma_1.default.blog.findFirst({
            where: {
                slug: payload.slug,
                NOT: { id },
            },
        });
        if (slugExists) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Slug already exists");
        }
    }
    const result = yield prisma_1.default.blog.update({
        where: { id },
        data: payload,
    });
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield prisma_1.default.blog.findUnique({
        where: { id },
    });
    if (!blog) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
    }
    yield prisma_1.default.blog.delete({
        where: { id },
    });
    return null;
});
exports.BlogServices = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
};
