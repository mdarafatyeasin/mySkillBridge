import express, { Request, Response } from "express"
import { tutorController } from "./tutor.controller";
import { auth, UserRole } from "../../middleware/auth";

const router = express.Router()

router.post('/',auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), tutorController.createTutorProfile)
router.get('/',auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), tutorController.getTutorProfile)

export const tutorRoutes = router;