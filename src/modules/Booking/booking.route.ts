import express, { Request, Response } from "express"
import { auth, UserRole } from "../../middleware/auth";
import { bookingController } from "./booking.controller";

const router = express.Router()

router.post('/',auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), bookingController.createBooking)

export const bookingRoutes = router;