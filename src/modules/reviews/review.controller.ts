import { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
    try {
        const user_id = req.user?.id;
        const result = await reviewService.createReview(req.body, user_id as string);
        res.status(200).json({
            success: true,
            message: "review posted",
            data: result
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "failed to post review",
            error: err
        })
    }
}

export const reviewController = {
    createReview
}