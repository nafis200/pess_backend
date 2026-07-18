import express from 'express';
import { VideoController } from './video.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', VideoController.getAllVideos);          
router.get('/:id', VideoController.getSingleVideo);    
router.post('/add-video',auth("USER", "ADMIN"), VideoController.insertVideo); 
router.delete('/:id',auth("USER", "ADMIN"),VideoController.deleteVideo);    

export const VideoRoutes = router;