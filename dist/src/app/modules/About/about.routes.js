"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const about_controller_1 = require("./about.controller");
const router = (0, express_1.Router)();
// Public routes (for frontend)
router.get("/all", about_controller_1.AboutControllers.getAllAboutData);
router.get("/public", about_controller_1.AboutControllers.getAboutPage);
// Protected routes (admin only)
router.get("/about-page", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.getAboutPage);
router.put("/about-page", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.updateAboutPage);
// Skills
router.get("/skills", about_controller_1.AboutControllers.getAllSkills);
router.post("/skills", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.createSkill);
router.put("/skills/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.updateSkill);
router.delete("/skills/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.deleteSkill);
// Education
router.get("/education", about_controller_1.AboutControllers.getAllEducation);
router.post("/education", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.createEducation);
router.put("/education/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.updateEducation);
router.delete("/education/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.deleteEducation);
// Experience
router.get("/experience", about_controller_1.AboutControllers.getAllExperience);
router.post("/experience", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.createExperience);
router.put("/experience/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.updateExperience);
router.delete("/experience/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.deleteExperience);
// Sports Expertise
router.get("/sports", about_controller_1.AboutControllers.getAllSports);
router.post("/sports", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.createSport);
router.put("/sports/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.updateSport);
router.delete("/sports/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.deleteSport);
// Achievements
router.get("/achievements", about_controller_1.AboutControllers.getAllAchievements);
router.post("/achievements", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.createAchievement);
router.put("/achievements/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.updateAchievement);
router.delete("/achievements/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.deleteAchievement);
// Certifications
router.get("/certifications", about_controller_1.AboutControllers.getAllCertifications);
router.post("/certifications", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.createCertification);
router.put("/certifications/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.updateCertification);
router.delete("/certifications/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.deleteCertification);
// Daily Activities
router.get("/activities", about_controller_1.AboutControllers.getAllActivities);
router.post("/activities", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.createActivity);
router.put("/activities/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.updateActivity);
router.delete("/activities/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.deleteActivity);
// Statistics
router.get("/statistics", about_controller_1.AboutControllers.getAllStatistics);
router.post("/statistics", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.createStatistic);
router.put("/statistics/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.updateStatistic);
router.delete("/statistics/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.deleteStatistic);
// Testimonials
router.get("/testimonials", about_controller_1.AboutControllers.getAllTestimonials);
router.post("/testimonials", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.createTestimonial);
router.put("/testimonials/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.updateTestimonial);
router.delete("/testimonials/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.deleteTestimonial);
// Gallery
router.get("/gallery", about_controller_1.AboutControllers.getAllGallery);
router.post("/gallery", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.createGalleryImage);
router.put("/gallery/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.updateGalleryImage);
router.delete("/gallery/:id", (0, auth_1.default)("ADMIN"), about_controller_1.AboutControllers.deleteGalleryImage);
exports.AboutRoutes = router;
