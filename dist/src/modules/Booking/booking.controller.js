import { bookingService } from "./booking.service";
import { getTeacherId } from "../timeSlot/slot.service";
const createBooking = async (req, res) => {
    try {
        const user_id = req.user?.id;
        const result = await bookingService.createBooking(req.body, user_id);
        res.status(200).json({
            success: true,
            message: "booking success",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "booking failed",
            error: err
        });
    }
};
const getTeacherBooking = async (req, res) => {
    try {
        const user_id = req.user?.id;
        const result = await bookingService.getTeacherBooking(user_id);
        res.status(200).json({
            success: true,
            message: "my bookings",
            bookings: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "booking not found",
            error: err
        });
    }
};
const getMyBooking = async (req, res) => {
    try {
        const user_id = req.user?.id;
        const result = await bookingService.getMyBooking(user_id);
        res.status(200).json({
            success: true,
            message: "my bookings",
            bookings: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "booking not found",
            error: err
        });
    }
};
const getMyBookingById = async (req, res) => {
    try {
        const user_id = req.user?.id;
        const booking_id = req.params.id;
        const result = await bookingService.getMyBookingById(user_id, booking_id);
        res.status(200).json({
            success: true,
            message: "my booking",
            bookings: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "booking not found",
            error: err
        });
    }
};
const updateMyBooking = async (req, res) => {
    try {
        const user_id = req.user?.id;
        const booking_id = req.params.id;
        const { status } = req.body;
        const result = await bookingService.updateMyBooking(user_id, booking_id, status);
        res.status(200).json({
            success: true,
            message: "booking updated",
            bookings: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "failed to update booking",
            error: err
        });
    }
};
const updateTeacherBooking = async (req, res) => {
    console.log("hit in update");
    try {
        const user_id = req.user?.id;
        const booking_id = req.params.id;
        const { status } = req.body;
        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "User ID not found in request",
            });
        }
        // console.log(status);
        const teacherId = await getTeacherId(user_id);
        // console.log(teacherId);
        const result = await bookingService.updateTeacherBooking(teacherId, booking_id, status);
        console.log(result);
        res.status(200).json({
            success: true,
            message: "booking updated",
            bookings: result
        });
        console.log(result);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "failed to update booking",
            error: err
        });
    }
};
const getAllBooking = async (req, res) => {
    try {
        const result = await bookingService.getAllBooking();
        res.status(200).json({
            success: true,
            message: "all bookings",
            bookings: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "booking not found",
            error: err
        });
    }
};
export const bookingController = {
    createBooking,
    getMyBooking,
    getMyBookingById,
    updateMyBooking,
    updateTeacherBooking,
    getTeacherBooking,
    getAllBooking
};
//# sourceMappingURL=booking.controller.js.map