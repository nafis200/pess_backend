

import prisma from '../../../shared/prisma';
import { fileUploader } from '../../helper/fileUploader';



const uploadImages = async (files: any[]): Promise<any[]> => {
  const uploadResults = await Promise.all(
    files.map(async (file) => {
      const result = await fileUploader.uploadToCloudinary(file);
      return prisma.image.create({
        data: {
          name: file.originalname,
          size: file.size,
          mimetype: file.mimetype,
          url: result?.secure_url as string,
          publicId: result?.public_id as string, 
        },
      });
    })
  );
  return uploadResults;
};

const getAllImages = async () => {
  return await prisma.image.findMany();
};

const getSingleImage = async (id: string) => {
  return await prisma.image.findUnique({ where: { id } });
};

const deleteImage = async (id: string) => {
  const image = await prisma.image.findUnique({ where: { id } });
  if (image) {
    await fileUploader.removeFromCloudinary(image.publicId);
    return await prisma.image.delete({ where: { id } });
  }
  throw new Error("Image not found");
};

export const ImageService = {
  uploadImages,
  getAllImages,
  getSingleImage,
  deleteImage,
};