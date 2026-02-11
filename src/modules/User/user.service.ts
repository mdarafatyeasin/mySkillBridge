import { prisma } from "../../lib/prisma";
import { timeSlot } from "../timeSlot/slot.route";

const getUserProfile = async (user_id: string) => {
    const result = await prisma.user.findMany({
        where: {
            id: user_id
        },
        include: {
            // bookings: true,
            bookings: {
                include: {
                    slot: true
                }
            }
        }
    })
    return result
}

const allUser = async () => {
    const result = await prisma.user.findMany();
    return result;
}

const updateUserProfile = async (user_id: string, data: any) => {
    const result = await prisma.user.update({
        where: {
            id: user_id
        },
        data: data
    })
    return result
}


export const userService = {
    getUserProfile,
    allUser,
    updateUserProfile
}
