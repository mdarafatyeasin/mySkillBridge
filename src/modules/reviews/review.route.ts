import express, { Request, Response } from "express"
import { auth, UserRole } from "../../middleware/auth";

const router = express.Router()

router.post('/', auth(UserRole.USER, UserRole.ADMIN), (req: Request, res: Response) => {
    console.log('object');
})


export const reviewRoute = router;