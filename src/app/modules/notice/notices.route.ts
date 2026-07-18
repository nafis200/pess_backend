import express from "express";
import { NoticeController } from "./notices.controller";
import fileUpload from "express-fileupload";
import auth from "../../middlewares/auth";
const router = express.Router();

router.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);

router.post("/create-notice",auth("ADMIN"),NoticeController.createNotice);

router.get("/", NoticeController.getAllNotices);

router.get("/:id", NoticeController.getSingleNotice);

router.delete("/:id",auth("ADMIN"), NoticeController.deleteNotice);

export const NoticeRoutes = router;
