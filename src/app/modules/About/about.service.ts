import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status-codes";

interface AboutPageData {
  name?: string;
  designation?: string;
  tagline?: string;
  profileImage?: string;
  introText?: string;
  resumeLink?: string;
  aboutDescription?: string;
  yearsOfExperience?: number;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  email?: string;
  quote?: string;
  quoteAuthor?: string;
}

interface SkillData {
  id?: number;
  name: string;
  percentage: number;
  order?: number;
}

interface EducationData {
  id?: number;
  degree: string;
  institution: string;
  passingYear?: number;
  specialization?: string;
  grade?: string;
}

interface ExperienceData {
  id?: number;
  institutionName: string;
  role: string;
  duration: string;
  description?: string;
  sports?: string[];
  order?: number;
}

interface SportExpertiseData {
  id?: number;
  name: string;
  icon: string;
  description?: string;
  level?: string;
  order?: number;
}

interface AchievementData {
  id?: number;
  title: string;
  organization?: string;
  year?: number;
  icon?: string;
  order?: number;
}

interface CertificationData {
  id?: number;
  certificateName: string;
  organization: string;
  year?: number;
}

interface DailyActivityData {
  id?: number;
  title: string;
  time: string;
  description?: string;
  icon?: string;
  order?: number;
}

interface StatisticData {
  id?: number;
  title: string;
  count: number;
  suffix?: string;
  order?: number;
}

interface TestimonialData {
  id?: number;
  studentName: string;
  image?: string;
  message: string;
  designation?: string;
  rating?: number;
  order?: number;
}

interface GalleryImageData {
  id?: number;
  imageUrl: string;
  caption?: string;
  order?: number;
}

const getAboutPage = async () => {
  const aboutPage = await prisma.aboutPage.findFirst();
  return aboutPage;
};

const updateAboutPage = async (payload: AboutPageData) => {
  let aboutPage = await prisma.aboutPage.findFirst();

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
    aboutPage = await prisma.aboutPage.create({
      data: dataToUpdate,
    });
  } else {
    aboutPage = await prisma.aboutPage.update({
      where: { id: aboutPage.id },
      data: dataToUpdate,
    });
  }

  return aboutPage;
};

// Skills
const getAllSkills = async () => {
  return await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });
};

const createSkill = async (payload: SkillData) => {
  const result = await prisma.skill.create({
    data: {
      name: payload.name,
      percentage: payload.percentage,
      order: payload.order || 0,
    },
  });
  return result;
};

const updateSkill = async (id: number, payload: SkillData) => {
  const result = await prisma.skill.update({
    where: { id },
    data: {
      name: payload.name,
      percentage: payload.percentage,
      order: payload.order,
    },
  });
  return result;
};

const deleteSkill = async (id: number) => {
  await prisma.skill.delete({ where: { id } });
  return null;
};

// Education
const getAllEducation = async () => {
  return await prisma.education.findMany({
    orderBy: { passingYear: "desc" },
  });
};

const createEducation = async (payload: EducationData) => {
  const result = await prisma.education.create({
    data: {
      degree: payload.degree,
      institution: payload.institution,
      passingYear: payload.passingYear,
      specialization: payload.specialization,
      grade: payload.grade,
    },
  });
  return result;
};

const updateEducation = async (id: number, payload: EducationData) => {
  const result = await prisma.education.update({
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
};

const deleteEducation = async (id: number) => {
  await prisma.education.delete({ where: { id } });
  return null;
};

// Experience
const getAllExperience = async () => {
  return await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });
};

const createExperience = async (payload: ExperienceData) => {
  const result = await prisma.experience.create({
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
};

const updateExperience = async (id: number, payload: ExperienceData) => {
  const result = await prisma.experience.update({
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
};

const deleteExperience = async (id: number) => {
  await prisma.experience.delete({ where: { id } });
  return null;
};

// Sports Expertise
const getAllSports = async () => {
  return await prisma.sportExpertise.findMany({
    orderBy: { order: "asc" },
  });
};

const createSport = async (payload: SportExpertiseData) => {
  const result = await prisma.sportExpertise.create({
    data: {
      name: payload.name,
      icon: payload.icon,
      description: payload.description,
      level: payload.level || "Intermediate",
      order: payload.order || 0,
    },
  });
  return result;
};

const updateSport = async (id: number, payload: SportExpertiseData) => {
  const result = await prisma.sportExpertise.update({
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
};

const deleteSport = async (id: number) => {
  await prisma.sportExpertise.delete({ where: { id } });
  return null;
};

// Achievements
const getAllAchievements = async () => {
  return await prisma.aboutAchievement.findMany({
    orderBy: { year: "desc" },
  });
};

const createAchievement = async (payload: AchievementData) => {
  const result = await prisma.aboutAchievement.create({
    data: {
      title: payload.title,
      organization: payload.organization,
      year: payload.year,
      icon: payload.icon || "trophy",
      order: payload.order || 0,
    },
  });
  return result;
};

const updateAchievement = async (id: number, payload: AchievementData) => {
  const result = await prisma.aboutAchievement.update({
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
};

const deleteAchievement = async (id: number) => {
  await prisma.aboutAchievement.delete({ where: { id } });
  return null;
};

// Certifications
const getAllCertifications = async () => {
  return await prisma.aboutCertification.findMany({
    orderBy: { year: "desc" },
  });
};

const createCertification = async (payload: CertificationData) => {
  const result = await prisma.aboutCertification.create({
    data: {
      certificateName: payload.certificateName,
      organization: payload.organization,
      year: payload.year,
    },
  });
  return result;
};

const updateCertification = async (id: number, payload: CertificationData) => {
  const result = await prisma.aboutCertification.update({
    where: { id },
    data: {
      certificateName: payload.certificateName,
      organization: payload.organization,
      year: payload.year,
    },
  });
  return result;
};

const deleteCertification = async (id: number) => {
  await prisma.aboutCertification.delete({ where: { id } });
  return null;
};

// Daily Activities
const getAllActivities = async () => {
  return await prisma.dailyActivity.findMany({
    orderBy: { order: "asc" },
  });
};

const createActivity = async (payload: DailyActivityData) => {
  const result = await prisma.dailyActivity.create({
    data: {
      title: payload.title,
      time: payload.time,
      description: payload.description,
      icon: payload.icon || "clock",
      order: payload.order || 0,
    },
  });
  return result;
};

const updateActivity = async (id: number, payload: DailyActivityData) => {
  const result = await prisma.dailyActivity.update({
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
};

const deleteActivity = async (id: number) => {
  await prisma.dailyActivity.delete({ where: { id } });
  return null;
};

// Statistics
const getAllStatistics = async () => {
  return await prisma.statistic.findMany({
    orderBy: { order: "asc" },
  });
};

const createStatistic = async (payload: StatisticData) => {
  const result = await prisma.statistic.create({
    data: {
      title: payload.title,
      count: payload.count,
      suffix: payload.suffix || "+",
      order: payload.order || 0,
    },
  });
  return result;
};

const updateStatistic = async (id: number, payload: StatisticData) => {
  const result = await prisma.statistic.update({
    where: { id },
    data: {
      title: payload.title,
      count: payload.count,
      suffix: payload.suffix,
      order: payload.order,
    },
  });
  return result;
};

const deleteStatistic = async (id: number) => {
  await prisma.statistic.delete({ where: { id } });
  return null;
};

// Testimonials
const getAllTestimonials = async () => {
  return await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });
};

const createTestimonial = async (payload: TestimonialData) => {
  const result = await prisma.testimonial.create({
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
};

const updateTestimonial = async (id: number, payload: TestimonialData) => {
  const result = await prisma.testimonial.update({
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
};

const deleteTestimonial = async (id: number) => {
  await prisma.testimonial.delete({ where: { id } });
  return null;
};

// Gallery
const getAllGallery = async () => {
  return await prisma.aboutGalleryImage.findMany({
    orderBy: { order: "asc" },
  });
};

const createGalleryImage = async (payload: GalleryImageData) => {
  const result = await prisma.aboutGalleryImage.create({
    data: {
      imageUrl: payload.imageUrl,
      caption: payload.caption,
      order: payload.order || 0,
    },
  });
  return result;
};

const updateGalleryImage = async (id: number, payload: GalleryImageData) => {
  const result = await prisma.aboutGalleryImage.update({
    where: { id },
    data: {
      imageUrl: payload.imageUrl,
      caption: payload.caption,
      order: payload.order,
    },
  });
  return result;
};

const deleteGalleryImage = async (id: number) => {
  await prisma.aboutGalleryImage.delete({ where: { id } });
  return null;
};

// Get All About Data (for public page)
const getAllAboutData = async () => {
  const [aboutPage, skills, education, experience, sports, achievements, certifications, activities, statistics, testimonials, gallery] = await Promise.all([
    prisma.aboutPage.findFirst(),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.education.findMany({ orderBy: { passingYear: "desc" } }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.sportExpertise.findMany({ orderBy: { order: "asc" } }),
    prisma.aboutAchievement.findMany({ orderBy: { year: "desc" } }),
    prisma.aboutCertification.findMany({ orderBy: { year: "desc" } }),
    prisma.dailyActivity.findMany({ orderBy: { order: "asc" } }),
    prisma.statistic.findMany({ orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
    prisma.aboutGalleryImage.findMany({ orderBy: { order: "asc" } }),
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
};

export const AboutServices = {
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
