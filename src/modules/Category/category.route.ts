import express, { Request, Response } from "express"
import { auth, UserRole } from "../../middleware/auth";
import { categoryController } from "./category.controller";

const router = express.Router()

router.post('/',auth(UserRole.ADMIN), categoryController.createCategory)
router.get('/', categoryController.getAllCategory)

export const categoryRoutes = router;