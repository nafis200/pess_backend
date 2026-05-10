import express from "express";

import { AuthRoutes } from "../modules/Auth/auth.route";
import { BlogRoutes } from "../modules/Blog/blog.route";
import { PublicBlogRoutes } from "../modules/Blog/public.blog.route";
import { ImageRoutes } from "../modules/Image/image.route";
import { AchievementUploadRoutes } from "../modules/Image/achievement-upload.route";
import MemberRoutes from "../modules/Member/member.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/admin/blog",
    route: BlogRoutes,
  },
  {
    path: "/blog",
    route: PublicBlogRoutes,
  },
  {
    path: "/image",
    route: ImageRoutes,
  },
  {
    path: "/upload",
    route: AchievementUploadRoutes,
  },
  {
    path: "/members",
    route: MemberRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
