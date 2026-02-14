import { Request, Response } from "express";
import { categoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoryService.createCategory(req.body)
        res.status(200).json({
            success: true,
            message: "category created",
            result
        })
    } catch (err) {
        res.status(500).json({
            message: "failed to create category",
            error: err
        })
    }
}


const getAllCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoryService.getAllCategory()
        res.status(200).json({
            success: true,
            message: "category fetched",
            result
        })
    } catch (err) {
        res.status(500).json({
            message: "failed to fetch category",
            error: err
        })
    }
}

export const categoryController = {
    createCategory,
    getAllCategory
}