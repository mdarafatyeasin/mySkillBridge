import express from "express";
import { auth, UserRole } from "../../middleware/auth";
import { reviewController } from "./review.controller";
const router = express.Router();
router.post('/', auth(UserRole.USER, UserRole.ADMIN, UserRole.TEACHER), reviewController.createReview);
export const reviewRoute = router;
//# sourceMappingURL=review.route.js.map