import express from 'express';
import { VideoController } from './video.controller';

const router = express.Router();

router.get('/', VideoController.getAllVideos);          
router.get('/:id', VideoController.getSingleVideo);    
router.post('/add-video', VideoController.insertVideo); 
router.delete('/:id', VideoController.deleteVideo);    

export const VideoRoutes = router;