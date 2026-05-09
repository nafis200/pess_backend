import express from 'express';
import { ImageController } from './image.controller';
import { fileUploader } from '../../helper/fileUploader';


const router = express.Router();

router.post(
  '/upload',
  fileUploader.upload.array('files'), 
  ImageController.uploadImages
);

router.get('/', ImageController.getAllImages);
router.get('/:id', ImageController.getSingleImage);
router.delete('/:id', ImageController.deleteImage);

export const ImageRoutes = router;