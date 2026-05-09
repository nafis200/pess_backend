import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { VideoService } from './video.service';

const insertVideo = catchAsync(async (req: Request, res: Response) => {
  const result = await VideoService.insertVideoIntoDB(req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Video saved successfully",
    data: result
  });
});

const getAllVideos = catchAsync(async (req: Request, res: Response) => {
  const result = await VideoService.getAllVideosFromDB();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Videos fetched successfully",
    data: result
  });
});

const getSingleVideo = catchAsync(async (req: Request, res: Response) => {
  const result = await VideoService.getSingleVideoFromDB(req.params.id as string);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Video fetched successfully",
    data: result
  });
});

const deleteVideo = catchAsync(async (req: Request, res: Response) => {
  await VideoService.deleteVideoFromDB(req.params.id as string);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Video deleted successfully",
    data: null
  });
});

export const VideoController = {
  insertVideo,
  getAllVideos,
  getSingleVideo,
  deleteVideo
};