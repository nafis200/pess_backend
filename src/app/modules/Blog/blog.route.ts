import { Router } from "express";
import auth from "../../middlewares/auth";
import { BlogControllers } from "./blog.controller";

const router = Router();

router.post("/", auth("ADMIN"), BlogControllers.createBlog);

router.get("/", auth("ADMIN"), BlogControllers.getAllBlogs);

router.get("/:id", auth("ADMIN"), BlogControllers.getSingleBlog);

router.put("/:id", auth("ADMIN"), BlogControllers.updateBlog);

router.delete("/:id", auth("ADMIN"), BlogControllers.deleteBlog);

export const BlogRoutes = router;