import express, { Request, Response } from "express"
import { tutorController } from "./tutor.controller";
import { auth, UserRole } from "../../middleware/auth";

const router = express.Router()

router.post('/', auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), tutorController.createTutorProfile)

router.get('/myProfile', auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), tutorController.getTutorProfile)

router.get('/', auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), tutorController.getAllTutor)

router.get('/:id', auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), tutorController.getTutorById)


export const tutorRoutes = router;