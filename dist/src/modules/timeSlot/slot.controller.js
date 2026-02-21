import { slotService } from "./slot.service";
const createSlot = async (req, res) => {
    try {
        const user_id = req.user?.id;
        const result = await slotService.createSlot(req.body, user_id);
        res.status(200).json({
            success: true,
            message: "New slot added",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            message: "failed to create slot",
            error: err
        });
    }
};
export const slotController = {
    createSlot
};
//# sourceMappingURL=slot.controller.js.map