import { error } from "node:console";
import { prisma } from "../../lib/prisma";
// teacher id hook
export const getTeacherId = async (user_id) => {
    const result = await prisma.tutorProfile.findUnique({
        where: {
            user_id: user_id
        }
    });
    return result?.id;
};
const createSlot = async (data, user_id) => {
    // console.log(user_id);
    const teacherId = await getTeacherId(user_id);
    if (!teacherId) {
        throw error("crate teacher profile");
    }
    const result = await prisma.timeSlot.create({
        data: {
            ...data,
            tutor_id: teacherId,
            available: true
        }
    });
    return result;
};
export const slotService = {
    createSlot
};
//# sourceMappingURL=slot.service.js.map