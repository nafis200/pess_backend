import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BlogServices } from "./blog.service";
import { BlogValidation } from "./blog.validation";
import validateRequest from "../../middlewares/validateRequest";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  await validateRequest(BlogValidation.createBlogValidation)(req, res, () => {});

  const result = await BlogServices.createBlog(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const { search, status, category, page, limit } = req.query;

  const result = await BlogServices.getAllBlogs({
    search: search as string,
    status: status as string,
    category: category as string,
    page: Number(page) || 1,
    limit: Number(limit) || 10,
  });

  res.status(httpStatus.OK).json({
    success: true,
    status: httpStatus.OK,
    message: "Blogs fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogServices.getSingleBlog(Number(id));

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Blog fetched successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  await validateRequest(BlogValidation.updateBlogValidation)(req, res, () => {});

  const { id } = req.params;
  const result = await BlogServices.updateBlog(Number(id), req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await BlogServices.deleteBlog(Number(id));

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Blog deleted successfully",
    data: null,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};