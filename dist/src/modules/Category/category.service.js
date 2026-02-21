import { prisma } from "../../lib/prisma";
const createCategory = async (payload) => {
    // console.log(payload);
    const result = await prisma.category.create({
        data: payload
    });
    return result;
};
const getAllCategory = async () => {
    const result = await prisma.category.findMany();
    return result;
};
export const categoryService = {
    createCategory,
    getAllCategory
};
//# sourceMappingURL=category.service.js.map