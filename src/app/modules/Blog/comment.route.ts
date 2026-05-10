import { Router, Request, Response } from "express";
import auth from "../../middlewares/auth";
import prisma from "../../../shared/prisma";
import catchAsync from "../../../shared/catchAsync";

const router = Router({ mergeParams: true });

router.get(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    const blogId = Number((req.params as any).blogId);

    const comments = await prisma.comment.findMany({
      where: { blogId, parentId: null },
      include: {
        replies: {
          include: { replies: true },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, data: comments });
  })
);

router.post(
  "/",
  auth("USER", "PREMIUM_USER", "ADMIN"),
  catchAsync(async (req: Request, res: Response) => {
    const blogId = Number((req.params as any).blogId);
    const userId = (req as any).user?.userId;
    const { content, parentId } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    const comment = await prisma.comment.create({
      data: {
        blogId,
        name: user?.name || "Anonymous",
        email: user?.email || "",
        content,
        parentId: parentId || null,
      },
    });

    res.status(201).json({ success: true, data: comment });
  })
);

router.post(
  "/:commentId/replies",
  auth("USER", "PREMIUM_USER", "ADMIN"),
  catchAsync(async (req: Request, res: Response) => {
    const blogId = Number((req.params as any).blogId);
    const userId = (req as any).user?.userId;
    const { content } = req.body;
    const commentId = Number(req.params.commentId);

    const user = await prisma.user.findUnique({ where: { id: userId } });

    const reply = await prisma.comment.create({
      data: {
        blogId,
        parentId: commentId,
        name: user?.name || "Anonymous",
        email: user?.email || "",
        content,
      },
    });

    res.status(201).json({ success: true, data: reply });
  })
);

router.delete(
  "/:commentId",
  auth("USER", "PREMIUM_USER", "ADMIN"),
  catchAsync(async (req: Request, res: Response) => {
    const commentId = Number(req.params.commentId);
    await prisma.comment.delete({ where: { id: commentId } });
    res.status(200).json({ success: true });
  })
);

export const CommentRoutes = router;