import auth from "../../middlewares/auth";
import express, { Router } from "express";
import { MemberControllers } from "./member.controller";

const router: Router = express.Router();

router.post("/", auth("ADMIN"), MemberControllers.createMember);
router.get("/", MemberControllers.getAllMembers);
router.get("/stats", MemberControllers.getStats);
router.get("/faculty", MemberControllers.getFaculty);
router.get("/students", MemberControllers.getStudents);
router.get("/achievements", MemberControllers.getAchievements);
router.get("/:id", MemberControllers.getSingleMember);
router.put("/:id", auth("ADMIN"), MemberControllers.updateMember);
router.delete("/:id", auth("ADMIN"), MemberControllers.deleteMember);
router.post("/achievements", auth("ADMIN"), MemberControllers.createAchievement);
router.put("/achievements/:id", auth("ADMIN"), MemberControllers.updateAchievement);
router.delete("/achievements/:id", auth("ADMIN"), MemberControllers.deleteAchievement);

export default router;