import express from 'express';
import { ImageController } from './image.controller';
import { fileUploader } from '../../helper/fileUploader';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post(
  '/upload',auth("USER", "ADMIN"),
  fileUploader.upload.array('files'), 
  ImageController.uploadImages
);

router.get('/', ImageController.getAllImages);
router.get('/:id', ImageController.getSingleImage);
router.delete('/:id',auth("USER", "ADMIN"),ImageController.deleteImage);

export const ImageRoutes = router;