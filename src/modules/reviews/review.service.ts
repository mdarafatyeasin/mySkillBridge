import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const crateReview = async (data: Omit<Review, "id" | "student_id" | "create_at" | "update_at">, user_id: string) => {
    const result = await prisma.review.create({
        data: {
            ...data,
            student_id: user_id
        }
    })
    return result;
};


export const reviewService = {
    crateReview
};