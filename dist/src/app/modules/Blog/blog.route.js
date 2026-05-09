"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const blog_controller_1 = require("./blog.controller");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)("ADMIN"), blog_controller_1.BlogControllers.createBlog);
router.get("/", (0, auth_1.default)("ADMIN"), blog_controller_1.BlogControllers.getAllBlogs);
router.get("/:id", (0, auth_1.default)("ADMIN"), blog_controller_1.BlogControllers.getSingleBlog);
router.put("/:id", (0, auth_1.default)("ADMIN"), blog_controller_1.BlogControllers.updateBlog);
router.delete("/:id", (0, auth_1.default)("ADMIN"), blog_controller_1.BlogControllers.deleteBlog);
exports.BlogRoutes = router;
