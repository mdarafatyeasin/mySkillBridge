import { Request, Response } from "express"
import { bookingService } from "./booking.service"
import { success } from "better-auth"
import { BookingStatus } from "../../../generated/prisma/enums"
import { getTeacherId } from "../timeSlot/slot.service"

const createBooking = async (req: Request, res: Response) => {
    try {
        const user_id = req.user?.id
        const result = await bookingService.createBooking(req.body, user_id as string)
        res.status(200).json({
            success: true,
            message: "booking success",
            data: result
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "booking failed",
            error: err
        })
    }
}

const getMyBooking = async (req: Request, res: Response) => {
    try {
        const user_id = req.user?.id
        const result = await bookingService.getMyBooking(user_id as string)
        res.status(200).json({
            success: true,
            message: "my bookings",
            bookings: result
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "booking not found",
            error: err
        })
    }
}

const getMyBookingById = async (req: Request, res: Response) => {
    try {
        const user_id = req.user?.id
        const booking_id = req.params.id
        const result = await bookingService.getMyBookingById(user_id as string, booking_id as string)
        res.status(200).json({
            success: true,
            message: "my booking",
            bookings: result
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "booking not found",
            error: err
        })
    }
}

const updateMyBooking = async (req: Request, res: Response) => {
    try {
        const user_id = req.user?.id
        const booking_id = req.params.id
        const { status } = req.body
        const result = await bookingService.updateMyBooking(user_id as string, booking_id as string, status as BookingStatus)
        res.status(200).json({
            success: true,
            message: "booking updated",
            bookings: result
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "failed to update booking",
            error: err
        })
    }
}

const updateTeacherBooking = async (req: Request, res: Response) => {
    try {
        const user_id = req.user?.id
        const booking_id = req.params.id
        const { status } = req.body

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "User ID not found in request",
            });
        }

        const teacherId = await getTeacherId(user_id)
        const result = await bookingService.updateTeacherBooking(teacherId as string, booking_id as string, status as BookingStatus)
        res.status(200).json({
            success: true,
            message: "booking updated",
            bookings: result
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "failed to update booking",
            error: err
        })
    }
}


export const bookingController = {
    createBooking,
    getMyBooking,
    getMyBookingById,
    updateMyBooking,
    updateTeacherBooking
}
