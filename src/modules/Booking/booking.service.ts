import { Booking, BookingStatus } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { getTeacherId } from "../timeSlot/slot.service";

const createBooking = async (data: Omit<Booking, "id" | "status">, user_id: string) => {
    const result = await prisma.booking.create({
        data: {
            ...data,
            student_id: user_id
        }
    })
    return result
}

const getMyBooking = async (userId: string) => {
    const result = await prisma.booking.findMany({
        where: {
            student_id: userId
        },
        include: {
            slot: true
        }
    })
    return result;
}


const getMyBookingById = async (userId: string, bookingId: string) => {
    const result = await prisma.booking.findUnique({
        where: {
            id: bookingId,
            student_id: userId
        },
        include: {
            slot: true
        }
    })
    return result;
}

const updateMyBooking = async (userId: string, bookingId: string, bookingStatus: BookingStatus) => {
    const isExistBooking = await prisma.booking.findUnique({
        where: {
            id: bookingId,
            student_id: userId
        }
    })

    if (!isExistBooking) {
        throw new Error("booking not exist");
    }

    if (isExistBooking.status === "CONFIRMED") {
        throw new Error("sorry booking is confirmed");
    }

    const result = await prisma.booking.update({
        data: {
            status: bookingStatus
        },
        where: {
            id: bookingId,
            student_id: userId
        }
    })
    return result;
}

const updateTeacherBooking = async (teacherId: string, bookingId: string, bookingStatus: BookingStatus) => {
    const isExistBooking = await prisma.booking.findUnique({
        where: {
            id: bookingId,
            tutor_id: teacherId
        }
    })

    if (!isExistBooking) {
        throw new Error("booking not exist");
    }

    if (isExistBooking.status === "CANCELLED") {
        throw new Error("sorry booking is confirmed");
    }

    const result = await prisma.booking.update({
        data: {
            status: bookingStatus
        },
        where: {
            id: bookingId,
            tutor_id: teacherId
        }
    })
    return result;
}


export const bookingService = {
    createBooking,
    getMyBooking,
    getMyBookingById,
    updateMyBooking,
    updateTeacherBooking
}