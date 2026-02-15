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
const getTeacherBooking = async (userId: string) => {
    const teacherId = await getTeacherId(userId);
    if (!teacherId) {
        throw new Error("teacher not found");
    }
    const result = await prisma.booking.findMany({
        where: {
            tutor_id: teacherId
        },
        include: {
            slot: true,
            user: true
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
    // console.log(teacherId, bookingId, bookingStatus);
    // const isExistBooking = await prisma.booking.findUnique({
    //     where: {
    //         id: bookingId,
    //         tutor_id: teacherId
    //     }
    // })

    // // console.log(isExistBooking);

    // if (!isExistBooking) {
    //     throw new Error("booking not exist");
    // }

    // if (isExistBooking.status === "CANCELLED") {
    //     throw new Error("sorry booking is cancelled");
    // }

    const result = await prisma.booking.update({
        where: {
            id: bookingId,
            // tutor_id: teacherId
        },
        data: {
            status: bookingStatus
        },
    })

    return result;
}

const getAllBooking = async()=>{
    const result = await prisma.booking.findMany({
        include:{
            tutor:true,
            user:true
        }
    })
    return result
}


export const bookingService = {
    createBooking,
    getMyBooking,
    getMyBookingById,
    updateMyBooking,
    updateTeacherBooking,
    getTeacherBooking,
    getAllBooking
}