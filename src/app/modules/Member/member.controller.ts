import { Request, Response } from "express";
import { MemberServices } from "./member.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

const createMember = catchAsync(async (req: Request, res: Response) => {
  const result = await MemberServices.createMember(req.body);
  sendResponse(res, {
    success: true,
    status: 201,
    message: "Member created successfully",
    data: result,
  });
});

const getAllMembers = catchAsync(async (req: Request, res: Response) => {
  const filters = {
    search: req.query.search as string,
    memberType: req.query.memberType as string,
    sportCategory: req.query.sportCategory as string,
    status: req.query.status as string,
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 12,
  };

  const result = await MemberServices.getAllMembers(filters);
  sendResponse(res, {
    success: true,
    status: 200,
    message: "Members retrieved successfully",
    data: result.data,
  });
  (res as any).meta = result.meta;
});

const getSingleMember = catchAsync(async (req: Request, res: Response) => {
  const result = await MemberServices.getSingleMember(Number(req.params.id));
  sendResponse(res, {
    success: true,
    status: 200,
    message: "Member retrieved successfully",
    data: result,
  });
});

const updateMember = catchAsync(async (req: Request, res: Response) => {
  const result = await MemberServices.updateMember(Number(req.params.id), req.body);
  sendResponse(res, {
    success: true,
    status: 200,
    message: "Member updated successfully",
    data: result,
  });
});

const deleteMember = catchAsync(async (req: Request, res: Response) => {
  await MemberServices.deleteMember(Number(req.params.id));
  sendResponse(res, {
    success: true,
    status: 200,
    message: "Member deleted successfully",
    data: null,
  });
});

const getStats = catchAsync(async (_req: Request, res: Response) => {
  const result = await MemberServices.getStats();
  sendResponse(res, {
    success: true,
    status: 200,
    message: "Stats retrieved successfully",
    data: result,
  });
});

const getFaculty = catchAsync(async (_req: Request, res: Response) => {
  const result = await MemberServices.getFaculty();
  sendResponse(res, {
    success: true,
    status: 200,
    message: "Faculty retrieved successfully",
    data: result,
  });
});

const getStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = {
    search: req.query.search as string,
    sportCategory: req.query.sportCategory as string,
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 12,
  };

  const result = await MemberServices.getStudents(filters);
  sendResponse(res, {
    success: true,
    status: 200,
    message: "Students retrieved successfully",
    data: result.data,
  });
  (res as any).meta = result.meta;
});

const getAchievements = catchAsync(async (_req: Request, res: Response) => {
  const result = await MemberServices.getAchievements();
  sendResponse(res, {
    success: true,
    status: 200,
    message: "Achievements retrieved successfully",
    data: result,
  });
});

const createAchievement = catchAsync(async (req: Request, res: Response) => {
  const result = await MemberServices.createAchievement(req.body);
  sendResponse(res, {
    success: true,
    status: 201,
    message: "Achievement created successfully",
    data: result,
  });
});

const updateAchievement = catchAsync(async (req: Request, res: Response) => {
  const result = await MemberServices.updateAchievement(Number(req.params.id), req.body);
  sendResponse(res, {
    success: true,
    status: 200,
    message: "Achievement updated successfully",
    data: result,
  });
});

const deleteAchievement = catchAsync(async (req: Request, res: Response) => {
  await MemberServices.deleteAchievement(Number(req.params.id));
  sendResponse(res, {
    success: true,
    status: 200,
    message: "Achievement deleted successfully",
    data: null,
  });
});

export const MemberControllers = {
  createMember,
  getAllMembers,
  getSingleMember,
  updateMember,
  deleteMember,
  getStats,
  getFaculty,
  getStudents,
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};