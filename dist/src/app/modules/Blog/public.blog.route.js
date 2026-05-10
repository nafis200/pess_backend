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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicBlogRoutes = void 0;
const express_1 = require("express");
const blog_service_1 = require("./blog.service");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, status, category, page, limit } = req.query;
        const result = yield blog_service_1.BlogServices.getAllBlogs({
            search: search,
            status: status || "PUBLISHED",
            category: category,
            page: Number(page) || 1,
            limit: Number(limit) || 10,
        });
        res.status(200).json({
            success: true,
            status: 200,
            message: "Blogs fetched successfully",
            data: result.data,
            meta: result.meta,
        });
    }
    catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({
            success: false,
            status: 500,
            message: error.message || "Failed to fetch blogs",
            data: [],
            meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
        });
    }
}));
router.get("/slug/:slug", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const result = yield blog_service_1.BlogServices.getBlogBySlug(slug);
        if (!result || result.status !== "PUBLISHED") {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Blog not found",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            status: 200,
            message: "Blog fetched successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({
            success: false,
            status: 500,
            message: error.message || "Failed to fetch blog",
            data: null,
        });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield blog_service_1.BlogServices.getSingleBlog(Number(id));
        if (!result || result.status !== "PUBLISHED") {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Blog not found",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            status: 200,
            message: "Blog fetched successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({
            success: false,
            status: 500,
            message: error.message || "Failed to fetch blog",
            data: null,
        });
    }
}));
exports.PublicBlogRoutes = router;
