import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { ImageService } from './images.services';
import sendResponse from '../../../shared/sendResponse';


const uploadImages = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const result = await ImageService.uploadImages(files);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Images Uploaded Successfully",
    data: result,
  });
});

const getAllImages = catchAsync(async (req: Request, res: Response) => {
  const result = await ImageService.getAllImages();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Images fetched successfully",
    data: result,
  });
});

const getSingleImage = catchAsync(async (req: Request, res: Response) => {
  const result = await ImageService.getSingleImage(req.params.id as string);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Image fetched successfully",
    data: result,
  });
});

const deleteImage = catchAsync(async (req: Request, res: Response) => {
  const result = await ImageService.deleteImage(req.params.id as string);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Image deleted successfully",
    data: result,
  });
});

export const ImageController = {
  uploadImages,
  getAllImages,
  getSingleImage,
  deleteImage,
};