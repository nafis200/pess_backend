import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookingService } from "./booking.service";


const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.createBooking(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Booking request sent",
    data: result,
  });
});

const approveBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.approveBooking(req.params.id as string);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Booking approved",
    data: result,
  });
});

const rejectBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.rejectBooking(req.params.id as string);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Booking rejected",
    data: result,
  });
});

const rescheduleBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.rescheduleBooking(req.params.id as string, req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Booking rescheduled",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const { email, page, limit } = req.query;

  const result = await BookingService.getAllBookings({
    email: email as string,
    page: page as string,
    limit: limit as string,
  });

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "All bookings fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getSingleBooking(req.params.id as string);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Booking fetched",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.deleteBooking(req.params.id as string);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Booking deleted",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  approveBooking,
  rejectBooking,
  rescheduleBooking,
  getAllBookings,
  getSingleBooking,
  deleteBooking,
};