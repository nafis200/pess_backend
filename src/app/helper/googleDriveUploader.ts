import { google } from 'googleapis';
import fs from 'fs';
import config from '../config';
import { IFile } from '../interfaces/file';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const getDriveService = () => {
    if (!config.googleDrive.serviceAccountBase64) {
        throw new Error('Google Service Account Base64 is not provided');
    }

    const jsonString = Buffer.from(config.googleDrive.serviceAccountBase64, 'base64').toString('utf-8');
    const credentials = JSON.parse(jsonString);

    const auth = new google.auth.JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: SCOPES,
    });

    return google.drive({ version: 'v3', auth });
};

const uploadToGoogleDrive = async (file: IFile): Promise<{ fileId: string, webViewLink: string }> => {
    const drive = getDriveService();
    
    try {
        const fileMetadata = {
            name: file.originalname,
            parents: [config.googleDrive.folderId as string],
        };

        const media = {
            mimeType: 'application/pdf',
            body: fs.createReadStream(file.path),
        };

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id, webViewLink',
            supportsAllDrives: true, // Required for shared drives and quota issues
        });

        // Make the file publicly accessible
        await drive.permissions.create({
            fileId: response.data.id as string,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
            supportsAllDrives: true,
        });

        const result = await drive.files.get({
            fileId: response.data.id as string,
            fields: 'id, webViewLink',
            supportsAllDrives: true,
        });

        // Delete local file after upload
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        return {
            fileId: result.data.id as string,
            webViewLink: result.data.webViewLink as string,
        };
    } catch (error: any) {
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
        console.error('Google Drive Upload Error:', error);
        throw new Error(error.message || 'Google Drive Upload Failed');
    }
};

export const googleDriveUploader = {
    uploadToGoogleDrive,
};
