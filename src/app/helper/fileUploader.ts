import multer from "multer"
import path from "path"
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary';

import config from "../config";
import { ICloudinaryResponse, IFile } from "../interfaces/file";


cloudinary.config({
    cloud_name: config.cloudinary.cloud_name, 
    api_key: config.cloudinary.cloud_api_key,
    api_secret: config.cloudinary.cloud_secret_key
}); 

const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

const uploadToCloudinary = async (file: IFile): Promise<ICloudinaryResponse | undefined> => {
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'image'
        }) as unknown as ICloudinaryResponse;
        
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
        
        return result;
    } catch (error: any) {
        console.error("Cloudinary upload error:", error);
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
        throw new Error(error.message || "Cloudinary upload failed");
    }
};

export const fileUploader = {
    upload,
    uploadToCloudinary
}