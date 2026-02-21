import express from "express";
import { auth, UserRole } from "../../middleware/auth";
import { slotController } from "./slot.controller";
const router = express.Router();
router.post('/', auth(UserRole.TEACHER), slotController.createSlot);
export const timeSlot = router;
//# sourceMappingURL=slot.route.js.map