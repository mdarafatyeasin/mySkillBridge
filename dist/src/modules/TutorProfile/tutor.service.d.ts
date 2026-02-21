import { TutorProfile } from "../../../generated/prisma/client";
export declare const tutorService: {
    createTutorProfile: (data: Omit<TutorProfile, "id" | "createdAt" | "updateAt" | "user_id">, user_id: string) => Promise<{
        id: string;
        created_at: Date;
        update_at: Date;
        user_id: string;
        hourly_rate: number | null;
        experience_year: number | null;
        qualification: string | null;
        rating_avg: number | null;
        category_id: string;
    }>;
    getTutorProfile: (user_id: string) => Promise<({
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
        category: {
            id: string;
            created_at: Date;
            update_at: Date;
            category: string;
            description: string | null;
        };
        reviews: {
            id: string;
            student_id: string;
            tutor_id: string;
            booking_id: string;
            rating: number;
            comment: string;
            created_at: Date;
            updated_at: Date;
        }[];
        bookings: {
            id: string;
            student_id: string;
            tutor_id: string;
            time_slot: string;
            status: import("../../../generated/prisma/enums").BookingStatus;
        }[];
        timeSlots: {
            id: string;
            tutor_id: string;
            created_at: Date;
            updated_at: Date;
            start_time: Date;
            end_time: Date;
            available: boolean;
        }[];
    } & {
        id: string;
        created_at: Date;
        update_at: Date;
        user_id: string;
        hourly_rate: number | null;
        experience_year: number | null;
        qualification: string | null;
        rating_avg: number | null;
        category_id: string;
    })[]>;
    getAllTutor: ({ search, sortOrder }: {
        search: string | undefined;
        sortOrder: "asc" | "desc";
    }) => Promise<({
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
        category: {
            id: string;
            created_at: Date;
            update_at: Date;
            category: string;
            description: string | null;
        };
    } & {
        id: string;
        created_at: Date;
        update_at: Date;
        user_id: string;
        hourly_rate: number | null;
        experience_year: number | null;
        qualification: string | null;
        rating_avg: number | null;
        category_id: string;
    })[]>;
    getTutorById: (tutorId: string) => Promise<({
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
        category: {
            id: string;
            created_at: Date;
            update_at: Date;
            category: string;
            description: string | null;
        };
        reviews: {
            id: string;
            student_id: string;
            tutor_id: string;
            booking_id: string;
            rating: number;
            comment: string;
            created_at: Date;
            updated_at: Date;
        }[];
        bookings: {
            id: string;
            student_id: string;
            tutor_id: string;
            time_slot: string;
            status: import("../../../generated/prisma/enums").BookingStatus;
        }[];
        timeSlots: {
            id: string;
            tutor_id: string;
            created_at: Date;
            updated_at: Date;
            start_time: Date;
            end_time: Date;
            available: boolean;
        }[];
    } & {
        id: string;
        created_at: Date;
        update_at: Date;
        user_id: string;
        hourly_rate: number | null;
        experience_year: number | null;
        qualification: string | null;
        rating_avg: number | null;
        category_id: string;
    }) | null>;
};
//# sourceMappingURL=tutor.service.d.ts.map