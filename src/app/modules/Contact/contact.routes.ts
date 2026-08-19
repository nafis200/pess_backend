import express from "express";
import auth from "../../middlewares/auth";
import { ContactControllers } from "./contact.controller";

const router = express.Router();

router.get("/", ContactControllers.getAllContactInfo);

router.post("/", auth("ADMIN"), ContactControllers.createContactInfo);

router.put("/:id", auth("ADMIN"), ContactControllers.updateContactInfo);

router.delete("/:id", auth("ADMIN"), ContactControllers.deleteContactInfo);

export const ContactRoutes = router;