import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from "multer";
import path from "path";
import streamifier from 'streamifier';
import config from "../config";
import { ICloudinaryResponse, IFile } from "../interfaces/file";


cloudinary.config({
    cloud_name: config.cloudinary.cloud_name as string,
    api_key: config.cloudinary.cloud_api_key as string,
    api_secret: config.cloudinary.cloud_secret_key as string
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadToCloudinary = async (
    file: Express.Multer.File
): Promise<ICloudinaryResponse | undefined> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            (error, result) => {
                if (error) return reject(error);
                resolve(result as any);
            }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

const removeFromCloudinary = async (publicId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

export const fileUploader = {
    upload,
    uploadToCloudinary,
    removeFromCloudinary
};