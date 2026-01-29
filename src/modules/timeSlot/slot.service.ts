import { error } from "node:console";
import { TimeSlot } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


// teacher id hook
export const getTeacherId = async (user_id: string) => {
    const result = await prisma.tutorProfile.findUnique({
        where: {
            user_id: user_id
        }
    })
    return result?.id;
}

const createSlot = async (data: Omit<TimeSlot, "id" | "tutor_id" | "createdAt" | "updateAt">, user_id: string) => {
    // console.log(user_id);
    const teacherId =await getTeacherId(user_id)

    if (!teacherId) {
        throw error("crate teacher profile");
    }

    const result = await prisma.timeSlot.create({
        data: {
            ...data,
            tutor_id: teacherId,
            available: true
        }
    })

    return result;
}

export const slotService = {
    createSlot
}