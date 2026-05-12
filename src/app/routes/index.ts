import express from "express";

import { AuthRoutes } from "../modules/Auth/auth.route";
import { BlogRoutes } from "../modules/Blog/blog.route";
import { PublicBlogRoutes } from "../modules/Blog/public.blog.route";

import { AchievementUploadRoutes } from "../modules/Image/achievement-upload.route";
import MemberRoutes from "../modules/Member/member.route";
import { NoticeRoutes } from "../modules/Notice/notice.routes";
import { ImageRoutes } from "../modules/images/image.routes";
import { AboutRoutes } from "../modules/About/about.routes";

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
  {
    path: "/notices",
    route: NoticeRoutes,
  },
  {
    path: "/about",
    route: AboutRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
