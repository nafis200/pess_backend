"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/Auth/auth.route");
const blog_route_1 = require("../modules/Blog/blog.route");
const public_blog_route_1 = require("../modules/Blog/public.blog.route");
const image_route_1 = require("../modules/Image/image.route");
const achievement_upload_route_1 = require("../modules/Image/achievement-upload.route");
const member_route_1 = __importDefault(require("../modules/Member/member.route"));
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/admin/blog",
        route: blog_route_1.BlogRoutes,
    },
    {
        path: "/blog",
        route: public_blog_route_1.PublicBlogRoutes,
    },
    {
        path: "/image",
        route: image_route_1.ImageRoutes,
    },
    {
        path: "/upload",
        route: achievement_upload_route_1.AchievementUploadRoutes,
    },
    {
        path: "/members",
        route: member_route_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
