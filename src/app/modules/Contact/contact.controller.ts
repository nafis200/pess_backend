import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ContactServices } from "./contact.service";

const getAllContactInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactServices.getAllContactInfo();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Contact info fetched successfully",
    data: result,
  });
});

const createContactInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactServices.createContactInfo(req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Contact info created successfully",
    data: result,
  });
});

const updateContactInfo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactServices.updateContactInfo(Number(id), req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Contact info updated successfully",
    data: result,
  });
});

const deleteContactInfo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactServices.deleteContactInfo(Number(id));
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Contact info deleted successfully",
    data: result,
  });
});

export const ContactControllers = {
  getAllContactInfo,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
};