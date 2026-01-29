import express, { Request, Response } from "express"
import { auth, UserRole } from "../../middleware/auth";
import { slotController } from "./slot.controller";

const router = express.Router()

router.post('/', auth(UserRole.TEACHER), slotController.createSlot);
router.post('/', auth(UserRole.TEACHER), slotController.createSlot);

export const timeSlot = router;