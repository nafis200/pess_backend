import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

const REACTION_TYPES = ["love", "like", "clap", "inspiring", "insightful"];

// Get reactions for a blog
router.get("/:blogId/reactions", async (req, res) => {
  try {
    const { blogId } = req.params;
    const blogIdNum = Number(blogId);

    const reactions = await Promise.all(
      REACTION_TYPES.map(async (type) => {
        const count = await prisma.reaction.count({
          where: { blogId: blogIdNum, type },
        });
        return { type, count, hasReacted: false };
      })
    );

    res.json({ success: true, data: reactions });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch reactions" });
  }
});

// Toggle reaction
router.post("/:blogId/reactions", async (req, res) => {
  try {
    const { blogId } = req.params;
    const { type } = req.body;

    // For now, just create/update without user tracking
    const reaction = await prisma.reaction.create({
      data: {
        blogId: Number(blogId),
        type,
      },
    });

    const reactions = await Promise.all(
      REACTION_TYPES.map(async (rType) => {
        const count = await prisma.reaction.count({
          where: { blogId: Number(blogId), type: rType },
        });
        return { type: rType, count, hasReacted: rType === type };
      })
    );

    res.json({ success: true, data: reactions });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to toggle reaction" });
  }
});

export const ReactionRoutes = router;