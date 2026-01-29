import { Booking } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createBooking = async (data: Omit<Booking, "id" | "status">, user_id: string) => {
    const result = await prisma.booking.create({
        data: {
            ...data,
            student_id: user_id
        }
    })
    return result
}


export const bookingService = {
    createBooking,
}