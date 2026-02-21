import { Booking, BookingStatus } from "../../../generated/prisma/client";
export declare const bookingService: {
    createBooking: (data: Omit<Booking, "id" | "status">, user_id: string) => Promise<{
        id: string;
        student_id: string;
        tutor_id: string;
        time_slot: string;
        status: BookingStatus;
    }>;
    getMyBooking: (userId: string) => Promise<({
        slot: {
            id: string;
            tutor_id: string;
            created_at: Date;
            updated_at: Date;
            start_time: Date;
            end_time: Date;
            available: boolean;
        };
    } & {
        id: string;
        student_id: string;
        tutor_id: string;
        time_slot: string;
        status: BookingStatus;
    })[]>;
    getMyBookingById: (userId: string, bookingId: string) => Promise<({
        slot: {
            id: string;
            tutor_id: string;
            created_at: Date;
            updated_at: Date;
            start_time: Date;
            end_time: Date;
            available: boolean;
        };
    } & {
        id: string;
        student_id: string;
        tutor_id: string;
        time_slot: string;
        status: BookingStatus;
    }) | null>;
    updateMyBooking: (userId: string, bookingId: string, bookingStatus: BookingStatus) => Promise<{
        id: string;
        student_id: string;
        tutor_id: string;
        time_slot: string;
        status: BookingStatus;
    }>;
    updateTeacherBooking: (teacherId: string, bookingId: string, bookingStatus: BookingStatus) => Promise<{
        id: string;
        student_id: string;
        tutor_id: string;
        time_slot: string;
        status: BookingStatus;
    }>;
    getTeacherBooking: (userId: string) => Promise<({
        user: {
            role: string | null;
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            image: string | null;
            emailVerified: boolean;
        };
        slot: {
            id: string;
            tutor_id: string;
            created_at: Date;
            updated_at: Date;
            start_time: Date;
            end_time: Date;
            available: boolean;
        };
    } & {
        id: string;
        student_id: string;
        tutor_id: string;
        time_slot: string;
        status: BookingStatus;
    })[]>;
    getAllBooking: () => Promise<({
        user: {
            role: string | null;
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            image: string | null;
            emailVerified: boolean;
        };
        tutor: {
            id: string;
            created_at: Date;
            update_at: Date;
            user_id: string;
            hourly_rate: number | null;
            experience_year: number | null;
            qualification: string | null;
            rating_avg: number | null;
            category_id: string;
        };
    } & {
        id: string;
        student_id: string;
        tutor_id: string;
        time_slot: string;
        status: BookingStatus;
    })[]>;
};
//# sourceMappingURL=booking.service.d.ts.map