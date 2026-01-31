import { Request, Response } from "express";
import { tutorService } from "./tutor.service";
import { prisma } from "../../lib/prisma";


const createTutorProfile = async (req: Request, res: Response) => {
    try {
        // console.log(req.body);
        // console.log(req.user?.id);
        const user_id = req.user?.id
        const result = await tutorService.createTutorProfile(req.body, user_id as string)
        res.status(200).json({
            success: true,
            message: "teacher profile created successfully",
            data: result
        })
    } catch (err) {
        res.status(500).json({
            message: "failed to create profile",
            error: err
        })
    }
}

const getTutorProfile = async (req: Request, res: Response) => {
    try {
        const user_id = req.user?.id
        const result = await tutorService.getTutorProfile(user_id as string);
        res.status(200).json({
            success: true,
            message: "teachers data found",
            data: result
        })
    } catch (err) {
        res.status(500).json({
            message: "Please crate teacher profile",
            error: err
        })
    }
}

const getAllTutor = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;
        const searchText = search as string | undefined
        const sortOrder = req.query.sortOrder as 'asc' | 'desc';
        const result = await tutorService.getAllTutor({ search: searchText, sortOrder });
        res.status(200).json({
            success: true,
            message: "teachers data found",
            data: result
        })
    } catch (err) {
        res.status(500).json({
            message: "Please crate teacher profile",
            error: err
        })
    }
}

const getTutorById = async (req:Request, res:Response)=>{
    try {
        const tutorId = req.params
        const result = await tutorService.getTutorById(tutorId.id as string);
        res.status(200).json({
            success: true,
            message: "teachers data found",
            data: result
        })
    } catch (err) {
        res.status(500).json({
            message: "Tutor not found",
            error: err
        })
    }
}

export const tutorController = {
    createTutorProfile,
    getTutorProfile,
    getAllTutor,
    getTutorById
}