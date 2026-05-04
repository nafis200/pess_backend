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
exports.googleDriveUploader = void 0;
const googleapis_1 = require("googleapis");
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config"));
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const getDriveService = () => {
    if (!config_1.default.googleDrive.serviceAccountBase64) {
        throw new Error('Google Service Account Base64 is not provided');
    }
    const jsonString = Buffer.from(config_1.default.googleDrive.serviceAccountBase64, 'base64').toString('utf-8');
    const credentials = JSON.parse(jsonString);
    const auth = new googleapis_1.google.auth.JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: SCOPES,
    });
    return googleapis_1.google.drive({ version: 'v3', auth });
};
const uploadToGoogleDrive = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const drive = getDriveService();
    try {
        const fileMetadata = {
            name: file.originalname,
            parents: [config_1.default.googleDrive.folderId],
        };
        const media = {
            mimeType: 'application/pdf',
            body: fs_1.default.createReadStream(file.path),
        };
        const response = yield drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id, webViewLink',
            supportsAllDrives: true, // Required for shared drives and quota issues
        });
        // Make the file publicly accessible
        yield drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
            supportsAllDrives: true,
        });
        const result = yield drive.files.get({
            fileId: response.data.id,
            fields: 'id, webViewLink',
            supportsAllDrives: true,
        });
        // Delete local file after upload
        if (fs_1.default.existsSync(file.path)) {
            fs_1.default.unlinkSync(file.path);
        }
        return {
            fileId: result.data.id,
            webViewLink: result.data.webViewLink,
        };
    }
    catch (error) {
        if (fs_1.default.existsSync(file.path)) {
            fs_1.default.unlinkSync(file.path);
        }
        console.error('Google Drive Upload Error:', error);
        throw new Error(error.message || 'Google Drive Upload Failed');
    }
});
exports.googleDriveUploader = {
    uploadToGoogleDrive,
};
