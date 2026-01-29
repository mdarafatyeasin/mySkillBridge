import express, { Request, Response } from "express"
import { auth, UserRole } from "../../middleware/auth";

const router = express.Router()

router.post('/',auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), )

export const bookingRoutes = router;