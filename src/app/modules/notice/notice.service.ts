import prisma from "../../../shared/prisma";
import { fileUploader } from "../../helper/fileUploader";

const createNotice = async (
  payload: any,
) => {

 

  const title = payload.title?.trim() || payload['title ']?.trim() || "";
  const description = payload.description?.trim() || payload['description ']?.trim() || "";
  const noticeDate = payload.noticeDate?.trim() || payload['noticeDate ']?.trim() || "";

  if (!title) {
    throw new Error("Title is required");
  }

  if (!noticeDate) {
    throw new Error("Notice date is required");
  }

 

  const result = await prisma.notice.create({
    data: {
      title,
      description: description || null,
      noticeDate: new Date(noticeDate)
    },
  });

  return result;
};

const getAllNotices = async () => {
  return prisma.notice.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getSingleNotice = async (id: string) => {

  return prisma.notice.findUnique({
    where: { id },
  });
};

const deleteNotice = async (id: string) => {

  const notice = await prisma.notice.findUnique({
    where: { id },
  });

  if (!notice) {
    throw new Error("Notice not found");
  }
  return prisma.notice.delete({
    where: { id },
  });
};

export const NoticeService = {
  createNotice,
  getAllNotices,
  getSingleNotice,
  deleteNotice,
};