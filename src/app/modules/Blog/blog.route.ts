import { Router } from "express";
import auth from "../../middlewares/auth";
import { BlogControllers } from "./blog.controller";

const router = Router();

router.post("/",auth("USER", "ADMIN"), BlogControllers.createBlog);

router.get("/", auth("USER", "ADMIN"), BlogControllers.getAllBlogs);

router.get("/:id", auth("USER", "ADMIN"), BlogControllers.getSingleBlog);

router.put("/:id",auth("USER", "ADMIN"), BlogControllers.updateBlog);

router.delete("/:id",auth("USER", "ADMIN"), BlogControllers.deleteBlog);

export const BlogRoutes = router;