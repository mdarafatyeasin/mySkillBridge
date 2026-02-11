import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createReview = async (data: Omit<Review, "id" | "student_id" | "create_at" | "update_at">, user_id: string) => {
    console.log(data, user_id);

    if(!user_id){
        throw new Error("user is messing")
    }

    if(!data.booking_id){
        throw new Error("booking id not found");
    }

    const isBookingExist = await prisma.booking.findUnique({
        where:{
            id:data.booking_id,
            student_id:user_id
        }
    })

    if(!isBookingExist){
        throw new Error("Booking dose not exist");
    }

    const result = await prisma.review.create({
        data: {
            ...data,
            student_id: user_id
        }
    })
    return result;
};


export const reviewService = {
    createReview
};