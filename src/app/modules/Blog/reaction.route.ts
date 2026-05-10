import { Router, Request, Response } from "express";
import auth from "../../middlewares/auth";
import prisma from "../../../shared/prisma";
import catchAsync from "../../../shared/catchAsync";

const router = Router({ mergeParams: true });

const REACTION_TYPES = ["love", "like", "clap", "inspiring", "insightful"];

router.get(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    const blogId = Number((req.params as any).blogId);

    const reactions = await Promise.all(
      REACTION_TYPES.map(async (type) => {
        const count = await prisma.reaction.count({
          where: { blogId, type },
        });
        return { type, count, hasReacted: false };
      })
    );

    res.status(200).json({ success: true, data: reactions });
  })
);

router.post(
  "/",
  auth("USER", "PREMIUM_USER", "ADMIN"),
  catchAsync(async (req: Request, res: Response) => {
    const blogId = Number((req.params as any).blogId);
    const { type } = req.body;
    const userId = String((req as any).user?.userId);

    const existingReaction = await prisma.reaction.findFirst({
      where: { blogId, userId },
    });

    if (existingReaction) {
      if (existingReaction.type === type) {
        await prisma.reaction.delete({ where: { id: existingReaction.id } });
      } else {
        await prisma.reaction.update({
          where: { id: existingReaction.id },
          data: { type },
        });
      }
    } else {
      await prisma.reaction.create({
        data: {
          blogId,
          type,
          userId: String(userId),
        },
      });
    }

    const reactions = await Promise.all(
      REACTION_TYPES.map(async (rType) => {
        const count = await prisma.reaction.count({
          where: { blogId, type: rType },
        });
        return { type: rType, count, hasReacted: false };
      })
    );

    res.status(200).json({ success: true, data: reactions });
  })
);

export const ReactionRoutes = router;