import { Router, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../helper/fileUploader";
import catchAsync from "../../../shared/catchAsync";

const router = Router();

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

router.post(
  "/achievement",
  auth("ADMIN"),
  (req, res, next) => {
    fileUploader.upload.single("image")(req, res, (err: any) => {
      if (err) {
        console.error("Multer error:", err);
        const statusCode = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
        return res.status(statusCode).json({
          success: false,
          message: err.message || "File upload error",
          code: err.code,
        });
      }
      next();
    });
  },
  catchAsync(async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const file = req.file as Express.Multer.File;

      if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Invalid file type. Allowed types: JPG, PNG, WEBP",
          code: "INVALID_FILE_TYPE",
        });
      }

      const result = await fileUploader.uploadToCloudinary(file);

      if (!result?.secure_url) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload image to cloud storage",
        });
      }

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          width: result.width,
          height: result.height,
        },
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Upload failed",
      });
    }
  })
);

export const AchievementUploadRoutes = router;