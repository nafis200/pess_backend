import { Router } from "express";
import auth from "../../middlewares/auth";
import { AboutControllers } from "./about.controller";

const router = Router();

// Public routes (for frontend)
router.get("/all", AboutControllers.getAllAboutData);
router.get("/public", AboutControllers.getAboutPage);

// Protected routes (admin only)
router.get("/about-page", auth("ADMIN"), AboutControllers.getAboutPage);
router.put("/about-page", auth("ADMIN"), AboutControllers.updateAboutPage);

// Skills
router.get("/skills", AboutControllers.getAllSkills);
router.post("/skills", auth("ADMIN"), AboutControllers.createSkill);
router.put("/skills/:id", auth("ADMIN"), AboutControllers.updateSkill);
router.delete("/skills/:id", auth("ADMIN"), AboutControllers.deleteSkill);

// Education
router.get("/education", AboutControllers.getAllEducation);
router.post("/education", auth("ADMIN"), AboutControllers.createEducation);
router.put("/education/:id", auth("ADMIN"), AboutControllers.updateEducation);
router.delete("/education/:id", auth("ADMIN"), AboutControllers.deleteEducation);

// Experience
router.get("/experience", AboutControllers.getAllExperience);
router.post("/experience", auth("ADMIN"), AboutControllers.createExperience);
router.put("/experience/:id", auth("ADMIN"), AboutControllers.updateExperience);
router.delete("/experience/:id", auth("ADMIN"), AboutControllers.deleteExperience);

// Sports Expertise
router.get("/sports", AboutControllers.getAllSports);
router.post("/sports", auth("ADMIN"), AboutControllers.createSport);
router.put("/sports/:id", auth("ADMIN"), AboutControllers.updateSport);
router.delete("/sports/:id", auth("ADMIN"), AboutControllers.deleteSport);

// Achievements
router.get("/achievements", AboutControllers.getAllAchievements);
router.post("/achievements", auth("ADMIN"), AboutControllers.createAchievement);
router.put("/achievements/:id", auth("ADMIN"), AboutControllers.updateAchievement);
router.delete("/achievements/:id", auth("ADMIN"), AboutControllers.deleteAchievement);

// Certifications
router.get("/certifications", AboutControllers.getAllCertifications);
router.post("/certifications", auth("ADMIN"), AboutControllers.createCertification);
router.put("/certifications/:id", auth("ADMIN"), AboutControllers.updateCertification);
router.delete("/certifications/:id", auth("ADMIN"), AboutControllers.deleteCertification);

// Daily Activities
router.get("/activities", AboutControllers.getAllActivities);
router.post("/activities", auth("ADMIN"), AboutControllers.createActivity);
router.put("/activities/:id", auth("ADMIN"), AboutControllers.updateActivity);
router.delete("/activities/:id", auth("ADMIN"), AboutControllers.deleteActivity);

// Statistics
router.get("/statistics", AboutControllers.getAllStatistics);
router.post("/statistics", auth("ADMIN"), AboutControllers.createStatistic);
router.put("/statistics/:id", auth("ADMIN"), AboutControllers.updateStatistic);
router.delete("/statistics/:id", auth("ADMIN"), AboutControllers.deleteStatistic);

// Testimonials
router.get("/testimonials", AboutControllers.getAllTestimonials);
router.post("/testimonials", auth("ADMIN"), AboutControllers.createTestimonial);
router.put("/testimonials/:id", auth("ADMIN"), AboutControllers.updateTestimonial);
router.delete("/testimonials/:id", auth("ADMIN"), AboutControllers.deleteTestimonial);

// Gallery
router.get("/gallery", AboutControllers.getAllGallery);
router.post("/gallery", auth("ADMIN"), AboutControllers.createGalleryImage);
router.put("/gallery/:id", auth("ADMIN"), AboutControllers.updateGalleryImage);
router.delete("/gallery/:id", auth("ADMIN"), AboutControllers.deleteGalleryImage);

export const AboutRoutes = router;
