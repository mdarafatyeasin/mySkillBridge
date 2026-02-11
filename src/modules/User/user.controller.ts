import { Request, Response } from "express";
import { userService } from "./user.service";

const getUserProfile = async (req: Request, res: Response) => {
    try {
        const user_id = req.user?.id
        const result = await userService.getUserProfile(user_id as string);
        res.status(200).json({
            success: true,
            message: "user data found",
            data: result
        })
    } catch (err) {
        res.status(500).json({
            message: "Please Log in to view your profile",
            error: err
        })
    }
}

const allUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.allUser();
        res.status(200).json({
            success: true,
            message: "user data found",
            data: result
        })
    } catch (err) {
        res.status(500).json({
            message: "Please Log in to view your profile",
            error: err
        })
    }
}

const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.id
        const data = req.body
        const result = await userService.updateUserProfile(user_id as string, data);
        res.status(200).json({
            success: true,
            message: "user profile updated",
            data: result
        })
    } catch (err) {
        res.status(500).json({
            message: "Please Log in to update your profile",
            error: err
        })
    }
}


export const userController = {
    getUserProfile,
    allUser,
    updateUserProfile
}