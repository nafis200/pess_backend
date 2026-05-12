"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAboutPage = () => __awaiter(void 0, void 0, void 0, function* () {
    const aboutPage = yield prisma_1.default.aboutPage.findFirst();
    return aboutPage;
});
const updateAboutPage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let aboutPage = yield prisma_1.default.aboutPage.findFirst();
    const dataToUpdate = {
        name: payload.name,
        designation: payload.designation,
        tagline: payload.tagline,
        profileImage: payload.profileImage,
        introText: payload.introText,
        resumeLink: payload.resumeLink,
        aboutDescription: payload.aboutDescription,
        yearsOfExperience: payload.yearsOfExperience,
        facebook: payload.facebook,
        linkedin: payload.linkedin,
        youtube: payload.youtube,
        email: payload.email,
        quote: payload.quote,
        quoteAuthor: payload.quoteAuthor,
    };
    if (!aboutPage) {
        aboutPage = yield prisma_1.default.aboutPage.create({
            data: dataToUpdate,
        });
    }
    else {
        aboutPage = yield prisma_1.default.aboutPage.update({
            where: { id: aboutPage.id },
            data: dataToUpdate,
        });
    }
    return aboutPage;
});
// Skills
const getAllSkills = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.skill.findMany({
        orderBy: { order: "asc" },
    });
});
const createSkill = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.skill.create({
        data: {
            name: payload.name,
            percentage: payload.percentage,
            order: payload.order || 0,
        },
    });
    return result;
});
const updateSkill = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.skill.update({
        where: { id },
        data: {
            name: payload.name,
            percentage: payload.percentage,
            order: payload.order,
        },
    });
    return result;
});
const deleteSkill = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.skill.delete({ where: { id } });
    return null;
});
// Education
const getAllEducation = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.education.findMany({
        orderBy: { passingYear: "desc" },
    });
});
const createEducation = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.education.create({
        data: {
            degree: payload.degree,
            institution: payload.institution,
            passingYear: payload.passingYear,
            specialization: payload.specialization,
            grade: payload.grade,
        },
    });
    return result;
});
const updateEducation = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.education.update({
        where: { id },
        data: {
            degree: payload.degree,
            institution: payload.institution,
            passingYear: payload.passingYear,
            specialization: payload.specialization,
            grade: payload.grade,
        },
    });
    return result;
});
const deleteEducation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.education.delete({ where: { id } });
    return null;
});
// Experience
const getAllExperience = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.experience.findMany({
        orderBy: { order: "asc" },
    });
});
const createExperience = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.experience.create({
        data: {
            institutionName: payload.institutionName,
            role: payload.role,
            duration: payload.duration,
            description: payload.description,
            sports: payload.sports || [],
            order: payload.order || 0,
        },
    });
    return result;
});
const updateExperience = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.experience.update({
        where: { id },
        data: {
            institutionName: payload.institutionName,
            role: payload.role,
            duration: payload.duration,
            description: payload.description,
            sports: payload.sports || [],
            order: payload.order,
        },
    });
    return result;
});
const deleteExperience = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.experience.delete({ where: { id } });
    return null;
});
// Sports Expertise
const getAllSports = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.sportExpertise.findMany({
        orderBy: { order: "asc" },
    });
});
const createSport = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.sportExpertise.create({
        data: {
            name: payload.name,
            icon: payload.icon,
            description: payload.description,
            level: payload.level || "Intermediate",
            order: payload.order || 0,
        },
    });
    return result;
});
const updateSport = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.sportExpertise.update({
        where: { id },
        data: {
            name: payload.name,
            icon: payload.icon,
            description: payload.description,
            level: payload.level,
            order: payload.order,
        },
    });
    return result;
});
const deleteSport = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.sportExpertise.delete({ where: { id } });
    return null;
});
// Achievements
const getAllAchievements = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.aboutAchievement.findMany({
        orderBy: { year: "desc" },
    });
});
const createAchievement = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.aboutAchievement.create({
        data: {
            title: payload.title,
            organization: payload.organization,
            year: payload.year,
            icon: payload.icon || "trophy",
            order: payload.order || 0,
        },
    });
    return result;
});
const updateAchievement = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.aboutAchievement.update({
        where: { id },
        data: {
            title: payload.title,
            organization: payload.organization,
            year: payload.year,
            icon: payload.icon,
            order: payload.order,
        },
    });
    return result;
});
const deleteAchievement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.aboutAchievement.delete({ where: { id } });
    return null;
});
// Certifications
const getAllCertifications = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.aboutCertification.findMany({
        orderBy: { year: "desc" },
    });
});
const createCertification = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.aboutCertification.create({
        data: {
            certificateName: payload.certificateName,
            organization: payload.organization,
            year: payload.year,
        },
    });
    return result;
});
const updateCertification = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.aboutCertification.update({
        where: { id },
        data: {
            certificateName: payload.certificateName,
            organization: payload.organization,
            year: payload.year,
        },
    });
    return result;
});
const deleteCertification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.aboutCertification.delete({ where: { id } });
    return null;
});
// Daily Activities
const getAllActivities = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.dailyActivity.findMany({
        orderBy: { order: "asc" },
    });
});
const createActivity = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.dailyActivity.create({
        data: {
            title: payload.title,
            time: payload.time,
            description: payload.description,
            icon: payload.icon || "clock",
            order: payload.order || 0,
        },
    });
    return result;
});
const updateActivity = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.dailyActivity.update({
        where: { id },
        data: {
            title: payload.title,
            time: payload.time,
            description: payload.description,
            icon: payload.icon,
            order: payload.order,
        },
    });
    return result;
});
const deleteActivity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.dailyActivity.delete({ where: { id } });
    return null;
});
// Statistics
const getAllStatistics = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.statistic.findMany({
        orderBy: { order: "asc" },
    });
});
const createStatistic = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.statistic.create({
        data: {
            title: payload.title,
            count: payload.count,
            suffix: payload.suffix || "+",
            order: payload.order || 0,
        },
    });
    return result;
});
const updateStatistic = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.statistic.update({
        where: { id },
        data: {
            title: payload.title,
            count: payload.count,
            suffix: payload.suffix,
            order: payload.order,
        },
    });
    return result;
});
const deleteStatistic = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.statistic.delete({ where: { id } });
    return null;
});
// Testimonials
const getAllTestimonials = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.testimonial.findMany({
        orderBy: { order: "asc" },
    });
});
const createTestimonial = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.testimonial.create({
        data: {
            studentName: payload.studentName,
            image: payload.image,
            message: payload.message,
            designation: payload.designation,
            rating: payload.rating || 5,
            order: payload.order || 0,
        },
    });
    return result;
});
const updateTestimonial = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.testimonial.update({
        where: { id },
        data: {
            studentName: payload.studentName,
            image: payload.image,
            message: payload.message,
            designation: payload.designation,
            rating: payload.rating,
            order: payload.order,
        },
    });
    return result;
});
const deleteTestimonial = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.testimonial.delete({ where: { id } });
    return null;
});
// Gallery
const getAllGallery = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.aboutGalleryImage.findMany({
        orderBy: { order: "asc" },
    });
});
const createGalleryImage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.aboutGalleryImage.create({
        data: {
            imageUrl: payload.imageUrl,
            caption: payload.caption,
            order: payload.order || 0,
        },
    });
    return result;
});
const updateGalleryImage = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.aboutGalleryImage.update({
        where: { id },
        data: {
            imageUrl: payload.imageUrl,
            caption: payload.caption,
            order: payload.order,
        },
    });
    return result;
});
const deleteGalleryImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.aboutGalleryImage.delete({ where: { id } });
    return null;
});
// Get All About Data (for public page)
const getAllAboutData = () => __awaiter(void 0, void 0, void 0, function* () {
    const [aboutPage, skills, education, experience, sports, achievements, certifications, activities, statistics, testimonials, gallery] = yield Promise.all([
        prisma_1.default.aboutPage.findFirst(),
        prisma_1.default.skill.findMany({ orderBy: { order: "asc" } }),
        prisma_1.default.education.findMany({ orderBy: { passingYear: "desc" } }),
        prisma_1.default.experience.findMany({ orderBy: { order: "asc" } }),
        prisma_1.default.sportExpertise.findMany({ orderBy: { order: "asc" } }),
        prisma_1.default.aboutAchievement.findMany({ orderBy: { year: "desc" } }),
        prisma_1.default.aboutCertification.findMany({ orderBy: { year: "desc" } }),
        prisma_1.default.dailyActivity.findMany({ orderBy: { order: "asc" } }),
        prisma_1.default.statistic.findMany({ orderBy: { order: "asc" } }),
        prisma_1.default.testimonial.findMany({ orderBy: { order: "asc" } }),
        prisma_1.default.aboutGalleryImage.findMany({ orderBy: { order: "asc" } }),
    ]);
    return {
        aboutPage,
        skills,
        education,
        experience,
        sports,
        achievements,
        certifications,
        activities,
        statistics,
        testimonials,
        gallery,
    };
});
exports.AboutServices = {
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
