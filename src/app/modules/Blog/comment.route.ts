import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Get comments for a blog
router.get("/:blogId/comments", async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { blogId: Number(blogId), parentId: null },
      include: {
        replies: {
          include: { replies: true },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: comments });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch comments" });
  }
});

// Create comment
router.post("/:blogId/comments", async (req, res) => {
  try {
    const { blogId } = req.params;
    const { name, email, content, parentId } = req.body;
    const comment = await prisma.comment.create({
      data: {
        blogId: Number(blogId),
        name,
        email,
        content,
        parentId: parentId || null,
      },
    });
    res.json({ success: true, data: comment });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create comment" });
  }
});

// Reply to comment
router.post("/:blogId/comments/:commentId/replies", async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const { name, email, content } = req.body;
    const reply = await prisma.comment.create({
      data: {
        blogId: Number(blogId),
        parentId: Number(commentId),
        name,
        email,
        content,
      },
    });
    res.json({ success: true, data: reply });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create reply" });
  }
});

// Delete comment
router.delete("/:blogId/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    await prisma.comment.delete({ where: { id: Number(commentId) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete comment" });
  }
});

export const CommentRoutes = router;