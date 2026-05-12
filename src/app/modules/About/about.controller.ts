import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AboutServices } from "./about.service";

// About Page
const getAboutPage = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.getAboutPage();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "About page data fetched successfully",
    data: result,
  });
});

const updateAboutPage = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.updateAboutPage(req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "About page updated successfully",
    data: result,
  });
});

// Skills
const getAllSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.getAllSkills();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Skills fetched successfully",
    data: result,
  });
});

const createSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.createSkill(req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Skill created successfully",
    data: result,
  });
});

const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AboutServices.updateSkill(Number(id), req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Skill updated successfully",
    data: result,
  });
});

const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AboutServices.deleteSkill(Number(id));
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Skill deleted successfully",
    data: null,
  });
});

// Education
const getAllEducation = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.getAllEducation();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Education fetched successfully",
    data: result,
  });
});

const createEducation = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.createEducation(req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Education created successfully",
    data: result,
  });
});

const updateEducation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AboutServices.updateEducation(Number(id), req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Education updated successfully",
    data: result,
  });
});

const deleteEducation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AboutServices.deleteEducation(Number(id));
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Education deleted successfully",
    data: null,
  });
});

// Experience
const getAllExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.getAllExperience();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Experience fetched successfully",
    data: result,
  });
});

const createExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.createExperience(req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Experience created successfully",
    data: result,
  });
});

const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AboutServices.updateExperience(Number(id), req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Experience updated successfully",
    data: result,
  });
});

const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AboutServices.deleteExperience(Number(id));
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Experience deleted successfully",
    data: null,
  });
});

// Sports Expertise
const getAllSports = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.getAllSports();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Sports expertise fetched successfully",
    data: result,
  });
});

const createSport = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.createSport(req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Sport expertise created successfully",
    data: result,
  });
});

const updateSport = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AboutServices.updateSport(Number(id), req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Sport expertise updated successfully",
    data: result,
  });
});

const deleteSport = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AboutServices.deleteSport(Number(id));
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Sport expertise deleted successfully",
    data: null,
  });
});

// Achievements
const getAllAchievements = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.getAllAchievements();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Achievements fetched successfully",
    data: result,
  });
});

const createAchievement = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.createAchievement(req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Achievement created successfully",
    data: result,
  });
});

const updateAchievement = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AboutServices.updateAchievement(Number(id), req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Achievement updated successfully",
    data: result,
  });
});

const deleteAchievement = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AboutServices.deleteAchievement(Number(id));
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Achievement deleted successfully",
    data: null,
  });
});

// Certifications
const getAllCertifications = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.getAllCertifications();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Certifications fetched successfully",
    data: result,
  });
});

const createCertification = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.createCertification(req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Certification created successfully",
    data: result,
  });
});

const updateCertification = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AboutServices.updateCertification(Number(id), req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Certification updated successfully",
    data: result,
  });
});

const deleteCertification = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AboutServices.deleteCertification(Number(id));
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Certification deleted successfully",
    data: null,
  });
});

// Daily Activities
const getAllActivities = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.getAllActivities();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Activities fetched successfully",
    data: result,
  });
});

const createActivity = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.createActivity(req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Activity created successfully",
    data: result,
  });
});

const updateActivity = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AboutServices.updateActivity(Number(id), req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Activity updated successfully",
    data: result,
  });
});

const deleteActivity = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AboutServices.deleteActivity(Number(id));
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Activity deleted successfully",
    data: null,
  });
});

// Statistics
const getAllStatistics = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.getAllStatistics();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Statistics fetched successfully",
    data: result,
  });
});

const createStatistic = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.createStatistic(req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Statistic created successfully",
    data: result,
  });
});

const updateStatistic = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AboutServices.updateStatistic(Number(id), req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Statistic updated successfully",
    data: result,
  });
});

const deleteStatistic = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AboutServices.deleteStatistic(Number(id));
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Statistic deleted successfully",
    data: null,
  });
});

// Testimonials
const getAllTestimonials = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.getAllTestimonials();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Testimonials fetched successfully",
    data: result,
  });
});

const createTestimonial = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.createTestimonial(req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Testimonial created successfully",
    data: result,
  });
});

const updateTestimonial = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AboutServices.updateTestimonial(Number(id), req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Testimonial updated successfully",
    data: result,
  });
});

const deleteTestimonial = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AboutServices.deleteTestimonial(Number(id));
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Testimonial deleted successfully",
    data: null,
  });
});

// Gallery
const getAllGallery = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.getAllGallery();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Gallery images fetched successfully",
    data: result,
  });
});

const createGalleryImage = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.createGalleryImage(req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Gallery image created successfully",
    data: result,
  });
});

const updateGalleryImage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AboutServices.updateGalleryImage(Number(id), req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Gallery image updated successfully",
    data: result,
  });
});

const deleteGalleryImage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AboutServices.deleteGalleryImage(Number(id));
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Gallery image deleted successfully",
    data: null,
  });
});

// Get All About Data (for public page)
const getAllAboutData = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutServices.getAllAboutData();
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "All about data fetched successfully",
    data: result,
  });
});

export const AboutControllers = {
  getAboutPage,
  updateAboutPage,
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getAllEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  getAllExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  getAllSports,
  createSport,
  updateSport,
  deleteSport,
  getAllAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getAllCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  getAllActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  getAllStatistics,
  createStatistic,
  updateStatistic,
  deleteStatistic,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getAllGallery,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getAllAboutData,
};
