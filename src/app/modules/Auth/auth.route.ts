import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";

import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/register", AuthControllers.registerUser);

router.get("/verify-email", AuthControllers.verifyEmail);

router.post("/login", AuthControllers.credentialsLogin);
router.post("/refresh-token",auth("USER", "ADMIN"), AuthControllers.getNewAccessToken);
router.post("/logout", AuthControllers.logout);

router.post("/change-password", auth("USER", "ADMIN"), AuthControllers.ChangePassword);

router.post("/forgot-password", AuthControllers.forgotPassword);

router.post("/reset-password", AuthControllers.resetPassword);


router.get("/", AuthControllers.getAllUsers);

router.get("/me", auth(), AuthControllers.getMyProfile);

router.get("/:id",auth("USER", "ADMIN"),AuthControllers.getSingleUser);

router.delete("/:id",auth("ADMIN"),AuthControllers.deleteUser);

export const AuthRoutes = router;