import express from "express";
import { auth, UserRole } from "../../middleware/auth";
import { bookingController } from "./booking.controller";
const router = express.Router();
router.post('/', auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), bookingController.createBooking);
router.get('/', auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), bookingController.getAllBooking);
router.get('/myBooking', auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), bookingController.getMyBooking);
router.get('/TeachersBooking', auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), bookingController.getTeacherBooking);
router.get('/myBooking/:id', auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), bookingController.getMyBookingById);
router.put('/myBooking/update/:id', auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), bookingController.updateMyBooking);
router.put('/teachersBooking/update/:id', auth(UserRole.ADMIN, UserRole.TEACHER, UserRole.USER), bookingController.updateTeacherBooking);
export const bookingRoutes = router;
//# sourceMappingURL=booking.route.js.map