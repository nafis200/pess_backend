import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { NoticeService } from './notice.service';
import { IFile } from '../../interfaces/file';
import config from '../../config';

const createNotice = catchAsync(async (req: Request, res: Response) => {
    const file = req.file as IFile;
    let pdfUrl = '';

    if (file) {
        // Ensure backend_url is not undefined
        const baseUrl = config.backend_url || 'http://localhost:5000';
        pdfUrl = `${baseUrl}/uploads/${file.filename}`;
    }

    const slug = req.body.title.toLowerCase().split(' ').join('-') + '-' + Date.now();

    const data = {
        ...req.body,
        pdfUrl,
        slug,
        publishDate: req.body.publishDate ? new Date(req.body.publishDate) : new Date(),
        isPublished: req.body.isPublished === 'true' || req.body.isPublished === true
    };

    const result = await NoticeService.createNotice(data);

    sendResponse(res, {
        status: httpStatus.CREATED,
        success: true,
        message: 'Notice created successfully',
        data: result,
    });
});

const getAllNotices = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ['search', 'category', 'isPublished']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await NoticeService.getAllNotices(filters, options);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Notices fetched successfully',
        meta: result.meta,
        data: result.data,
    });
});

const getSingleNotice = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await NoticeService.getSingleNotice(id);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Notice fetched successfully',
        data: result,
    });
});

const updateNotice = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const file = req.file as IFile;
    
    let updateData = { ...req.body };

    if (file) {
        const baseUrl = config.backend_url || 'http://localhost:5000';
        updateData.pdfUrl = `${baseUrl}/uploads/${file.filename}`;
    }

    if (updateData.title) {
        updateData.slug = updateData.title.toLowerCase().split(' ').join('-') + '-' + Date.now();
    }

    if (updateData.publishDate) {
        updateData.publishDate = new Date(updateData.publishDate);
    }
    
    if (updateData.isPublished !== undefined) {
        updateData.isPublished = updateData.isPublished === 'true' || updateData.isPublished === true;
    }

    const result = await NoticeService.updateNotice(id, updateData);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Notice updated successfully',
        data: result,
    });
});

const deleteNotice = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await NoticeService.deleteNotice(id);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Notice deleted successfully',
        data: result,
    });
});

const togglePublishStatus = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await NoticeService.togglePublishStatus(id);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Notice status updated successfully',
        data: result,
    });
});

export const NoticeController = {
    createNotice,
    getAllNotices,
    getSingleNotice,
    updateNotice,
    deleteNotice,
    togglePublishStatus
};
