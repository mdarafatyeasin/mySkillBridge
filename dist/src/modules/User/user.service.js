import { prisma } from "../../lib/prisma";
const getUserProfile = async (user_id) => {
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
    });
    return result;
};
const allUser = async () => {
    const result = await prisma.user.findMany();
    return result;
};
const updateUserProfile = async (user_id, data) => {
    const result = await prisma.user.update({
        where: {
            id: user_id
        },
        data: data
    });
    return result;
};
export const userService = {
    getUserProfile,
    allUser,
    updateUserProfile
};
//# sourceMappingURL=user.service.js.map