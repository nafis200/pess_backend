import { Router, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../helper/fileUploader";
import prisma from "../../../shared/prisma";
import catchAsync from "../../../shared/catchAsync";

const router = Router();

router.get(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    const gallery = await prisma.imageGallery.findFirst();
    
    if (!gallery || !gallery.images) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const images = gallery.images.map((url, index) => ({
      id: `${gallery.id}-${index}`,
      url: url,
    }));

    res.status(200).json({
      success: true,
      data: images,
    });
  })
);

router.get(
  "/admin",
  auth("ADMIN"),
  catchAsync(async (req: Request, res: Response) => {
    const gallery = await prisma.imageGallery.findFirst();
    
    if (!gallery || !gallery.images) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const images = gallery.images.map((url, index) => ({
      id: `${gallery.id}-${index}`,
      url: url,
      name: url.split('/').pop() || 'image',
    }));

    res.status(200).json({
      success: true,
      data: images,
    });
  })
);

router.delete(
  "/:id",
  auth("ADMIN"),
  catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const parts = id.split('-');
    const index = parseInt(parts[parts.length - 1]);
    
    const gallery = await prisma.imageGallery.findFirst();
    
    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    if (isNaN(index) || index < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid image index",
      });
    }

    const images = [...gallery.images];
    if (index >= 0 && index < images.length) {
      images.splice(index, 1);
    } else {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    await prisma.imageGallery.update({
      where: { id: gallery.id },
      data: { images },
    });

    res.status(200).json({
      success: true,
      message: "Image deleted",
    });
  })
);

router.post(
  "/upload",
  auth("ADMIN"),
  (req, res, next) => {
    fileUploader.upload.array("files")(req, res, (err: any) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({
          success: false,
          message: err.message || "File upload error",
        });
      }
      next();
    });
  },
  async (req: Request, res: Response) => {
    try {
      console.log("Uploading files...", req.files);

      if (!req.files || !(req.files as Express.Multer.File[]).length) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const files = req.files as Express.Multer.File[];
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const result = await fileUploader.uploadToCloudinary(file);
        if (result?.secure_url) {
          uploadedUrls.push(result.secure_url);
        }
      }

      // Save to ImageGallery
      let gallery = await prisma.imageGallery.findFirst();
      
      if (gallery) {
        const existingImages = gallery.images || [];
        await prisma.imageGallery.update({
          where: { id: gallery.id },
          data: { images: [...existingImages, ...uploadedUrls] },
        });
      } else {
        await prisma.imageGallery.create({
          data: { images: uploadedUrls },
        });
      }

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: files.map((file, idx) => ({
          name: file.originalname,
          size: file.size,
          mimetype: file.mimetype,
          url: uploadedUrls[idx] || "",
        })),
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Upload failed",
      });
    }
  }
);

export const ImageRoutes = router;