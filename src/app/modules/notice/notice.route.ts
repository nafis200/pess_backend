import express from "express";
import { NoticeController } from "./notice.controller";
import fileUpload from "express-fileupload";
const router = express.Router();

router.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);

router.post("/create-notice", NoticeController.createNotice);

router.get("/", NoticeController.getAllNotices);

router.get("/:id", NoticeController.getSingleNotice);

router.delete("/:id", NoticeController.deleteNotice);

export const NoticeRoutes = router;
