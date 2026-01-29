import { Request, Response } from "express"
import { slotService } from "./slot.service"
import { success } from "better-auth";

const createSlot = async (req: Request, res: Response) => {
    try {
        const user_id = req.user?.id;
        const result = await slotService.createSlot(req.body, user_id as any);
        res.status(200).json({
            success: true,
            message: "New slot added",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            message: "failed to create slot",
            error: err
        })
    }
}


export const slotController = {
    createSlot
}