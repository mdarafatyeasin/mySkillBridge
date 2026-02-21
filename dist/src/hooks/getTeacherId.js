import { prisma } from "../lib/prisma";
// teacher id hook
export const getTeacherId = async (user_id) => {
    const result = await prisma.tutorProfile.findUnique({
        where: {
            user_id: user_id
        }
    });
    return result?.id;
};
//# sourceMappingURL=getTeacherId.js.map