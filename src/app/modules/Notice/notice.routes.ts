import express, { NextFunction, Request, Response } from 'express';

import { fileUploader } from '../../helper/fileUploader';
import { NoticeValidation } from './notice.validation';
import { NoticeController } from './notice.controller';
import auth from '../../middlewares/auth';


const router = express.Router();

router.get('/', NoticeController.getAllNotices);

router.get('/:id', NoticeController.getSingleNotice);

router.post(
    '/', auth("ADMIN"),
    fileUploader.upload.single('pdf'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = NoticeValidation.createNotice.parse(req.body);
        return NoticeController.createNotice(req, res, next);
    }
);

router.put(
    '/:id',auth("ADMIN"),
    fileUploader.upload.single('pdf'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = NoticeValidation.updateNotice.parse(req.body);
        return NoticeController.updateNotice(req, res, next);
    }
);

router.patch('/:id/publish', NoticeController.togglePublishStatus);

router.delete('/:id', NoticeController.deleteNotice);

export const SaniulNoticeRoutes = router;
