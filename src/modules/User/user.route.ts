import express, { Request, Response } from "express"
import { auth, UserRole } from "../../middleware/auth";
import { userController } from "./user.controller";

const router = express.Router()
router.get('/myProfile', auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), userController.getUserProfile)
router.get('/allUser', auth(UserRole.ADMIN), userController.allUser)
router.put('/updateProfile/:id', auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), userController.updateUserProfile)


export const userRoutes = router;