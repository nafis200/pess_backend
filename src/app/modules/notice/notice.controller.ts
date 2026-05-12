import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

import { NoticeService } from "./notice.service";

const createNotice = catchAsync(async (req: Request, res: Response) => {
  const pdf = (req.files as any).pdf;
  const result = await NoticeService.createNotice(
    req.body,
    pdf
  );

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Notice Created Successfully",
    data: result,
  });
});

const getAllNotices = catchAsync(async (req: Request, res: Response) => {

  const result = await NoticeService.getAllNotices();

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Notices fetched successfully",
    data: result,
  });
});

const getSingleNotice = catchAsync(async (req: Request, res: Response) => {

  const result = await NoticeService.getSingleNotice(req.params.id as string);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Notice fetched successfully",
    data: result,
  });
});

const deleteNotice = catchAsync(async (req: Request, res: Response) => {

  const result = await NoticeService.deleteNotice(req.params.id as string);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Notice deleted successfully",
    data: result,
  });
});

export const NoticeController = {
  createNotice,
  getAllNotices,
  getSingleNotice,
  deleteNotice,
};