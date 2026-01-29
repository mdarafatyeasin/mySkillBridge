import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

const createCategory = async (payload: any) => {
    // console.log(payload);
    const result = await prisma.category.create({
        data: payload
    });
    return result;
}

export const categoryService = {
    createCategory
}