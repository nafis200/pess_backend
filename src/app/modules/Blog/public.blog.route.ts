import { Router, Request, Response } from "express";
import { BlogServices } from "./blog.service";
import { ReactionRoutes } from "./reaction.route";
import { CommentRoutes } from "./comment.route";

const router = Router();

router.use("/:blogId/reactions", ReactionRoutes);
router.use("/:blogId/comments", CommentRoutes);

router.get(
  "/",
  async (req: Request, res: Response) => {
    try {
      const { search, status, category, page, limit } = req.query;

      const result = await BlogServices.getAllBlogs({
        search: search as string,
        status: status as string || "PUBLISHED",
        category: category as string,
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
    } catch (error: any) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({
        success: false,
        status: 500,
        message: error.message || "Failed to fetch blogs",
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
      });
    }
  }
);

router.get(
  "/slug/:slug",
  async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const result = await BlogServices.getBlogBySlug(slug as string);

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
    } catch (error: any) {
      console.error("Error fetching blog:", error);
      res.status(500).json({
        success: false,
        status: 500,
        message: error.message || "Failed to fetch blog",
        data: null,
      });
    }
  }
);

router.get(
  "/:id",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await BlogServices.getSingleBlog(Number(id));

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
    } catch (error: any) {
      console.error("Error fetching blog:", error);
      res.status(500).json({
        success: false,
        status: 500,
        message: error.message || "Failed to fetch blog",
        data: null,
      });
    }
  }
);

export const PublicBlogRoutes = router;