import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status-codes";
import { Prisma } from "@prisma/client";

interface MemberPayload {
  name: string;
  email?: string;
  profilePhoto?: string;
  phone?: string;
  memberType: "FACULTY" | "STUDENT" | "ATHLETE" | "CAPTAIN" | "ALUMNI";
  sportCategory?: string;
  role?: string;
  status?: string;
  institution?: string;
  expertise?: string[];
  achievements?: string[];
  highlights?: string;
  yearsActive?: number;
  graduationYear?: number;
  userId?: number;
}

interface MemberFilters {
  search?: string;
  memberType?: string;
  sportCategory?: string;
  status?: string;
  page?: number;
  limit?: number;
}

const createMember = async (payload: MemberPayload) => {
  const result = await prisma.member.create({
    data: payload,
  });
  return result;
};

const getAllMembers = async (filters: MemberFilters) => {
  const { search, memberType, sportCategory, status, page = 1, limit = 12 } = filters;
  const skip = (page - 1) * limit;

  const where: Prisma.MemberWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { role: { contains: search, mode: "insensitive" } },
      { institution: { contains: search, mode: "insensitive" } },
    ];
  }

  if (memberType && memberType !== "ALL") {
    where.memberType = memberType as any;
  }

  if (sportCategory && sportCategory !== "ALL") {
    where.sportCategory = sportCategory;
  }

  if (status) {
    where.status = status;
  }

  const [members, total] = await Promise.all([
    prisma.member.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.member.count({ where }),
  ]);

  return {
    data: members,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSingleMember = async (id: number) => {
  const member = await prisma.member.findUnique({
    where: { id },
    include: {
      user: true,
      achievements_rel: true,
    },
  });

  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }

  return member;
};

const updateMember = async (id: number, payload: Partial<MemberPayload>) => {
  const existingMember = await prisma.member.findUnique({
    where: { id },
  });

  if (!existingMember) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }

  const result = await prisma.member.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteMember = async (id: number) => {
  const member = await prisma.member.findUnique({
    where: { id },
  });

  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }

  await prisma.member.delete({
    where: { id },
  });

  return null;
};

const getStats = async () => {
  const [faculty, students, athletes, achievements] = await Promise.all([
    prisma.member.count({ where: { memberType: "FACULTY", status: "ACTIVE" } }),
    prisma.member.count({ where: { memberType: "STUDENT", status: "ACTIVE" } }),
    prisma.member.count({ where: { memberType: "ATHLETE", status: "ACTIVE" } }),
    prisma.achievement.count(),
  ]);

  return {
    faculty,
    students,
    athletes,
    achievements,
    totalMembers: faculty + students + athletes,
  };
};

const getFaculty = async () => {
  return prisma.member.findMany({
    where: { memberType: "FACULTY", status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
  });
};

const getStudents = async (filters: MemberFilters) => {
  const { search, sportCategory, page = 1, limit = 12 } = filters;
  const skip = (page - 1) * limit;

  const where: Prisma.MemberWhereInput = {
    memberType: { in: ["STUDENT", "ATHLETE", "CAPTAIN", "ALUMNI"] },
    status: "ACTIVE",
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { role: { contains: search, mode: "insensitive" } },
    ];
  }

  if (sportCategory && sportCategory !== "ALL") {
    where.sportCategory = sportCategory;
  }

  const [members, total] = await Promise.all([
    prisma.member.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.member.count({ where }),
  ]);

  return {
    data: members,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getAchievements = async () => {
  return prisma.achievement.findMany({
    orderBy: { year: "desc" },
    include: { member: true },
  });
};

const createAchievement = async (payload: any) => {
  return prisma.achievement.create({
    data: payload,
  });
};

const updateAchievement = async (id: number, payload: any) => {
  return prisma.achievement.update({
    where: { id },
    data: payload,
  });
};

const deleteAchievement = async (id: number) => {
  await prisma.achievement.delete({
    where: { id },
  });
  return null;
};

export const MemberServices = {
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