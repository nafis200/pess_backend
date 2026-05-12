import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    expires_in: process.env.EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_pass_secret: process.env.RESET_PASS_TOKEN,
    reset_pass_token_expires_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN,
    register_verify_token: process.env.REGISTER_VERIFY_TOKEN,
  },
  GOOGLE_DRIVE_FOLDER_ID: process.env.GOOGLE_DRIVE_FOLDER_ID,
  GOOGLE_SERVICE_ACCOUNT_BASE64: process.env.GOOGLE_SERVICE_ACCOUNT_BASE64,
  googleDrives: {
    folderId: process.env.GOOGLE_DRIVE_FOLDER_ID,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URL,
    refreshToken: process.env.REFRESH_TOKEN,
  },
  reset_pass_link: process.env.RESET_PASS_LINK,
  registration_link: process.env.VERIFY_REGISTRATION_LINK,
  emailSender: {
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS,
  },

  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloud_api_key: process.env.CLOUDINARY_API_KEY,
    cloud_secret_key: process.env.CLOUDINARY_SECRET_KEY,
  },

    googleDrive: {
        serviceAccountBase64: process.env.GOOGLE_SERVICE_ACCOUNT_BASE64,
        folderId: process.env.GOOGLE_DRIVE_FOLDER_ID
    },

    databaseUrl: process.env.DATABASE_URL,
    frontend_url: process.env.FRONTEND_URL,
    backend_url: process.env.BACKEND_URL,
   supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
};
