import { TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";



const createTutorProfile = async (data: Omit<TutorProfile, "id" | "createdAt" | "updateAt" | "user_id">, user_id: string) => {
    // console.log(payload);
    const result = await prisma.tutorProfile.create({
        data: {
            ...data,
            user_id: user_id
        }
    })
    return result
}

const getTutorProfile = async (user_id: string) => {
    const result = await prisma.tutorProfile.findMany({
        where: {
            user_id: user_id
        },
        include:{
            bookings:true,
            reviews:true,
            timeSlots:true
        }
    })
    return result
}


export const tutorService = {
    createTutorProfile,
    getTutorProfile
}
