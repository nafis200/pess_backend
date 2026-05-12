import prisma from "../../../shared/prisma";



const insertVideoIntoDB = async (data: { title: string; videoLink: string }): Promise<any> => {
  return await prisma.video.create({ data });
};

const getAllVideosFromDB = async (): Promise<any[]> => {
  return await prisma.video.findMany({
    orderBy: { createdAt: 'desc' } 
  });
};

const getSingleVideoFromDB = async (id: string): Promise<any | null> => {
  return await prisma.video.findUnique({ where: { id } });
};

const deleteVideoFromDB = async (id: string): Promise<any> => {
  return await prisma.video.delete({ where: { id } });
};

export const VideoService = {
  insertVideoIntoDB,
  getAllVideosFromDB,
  getSingleVideoFromDB,
  deleteVideoFromDB
};