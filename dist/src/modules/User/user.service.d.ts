export declare const userService: {
    getUserProfile: (user_id: string) => Promise<({
        bookings: ({
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
            status: import("../../../generated/prisma/enums").BookingStatus;
        })[];
    } & {
        role: string | null;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string | null;
        emailVerified: boolean;
    })[]>;
    allUser: () => Promise<{
        role: string | null;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string | null;
        emailVerified: boolean;
    }[]>;
    updateUserProfile: (user_id: string, data: any) => Promise<{
        role: string | null;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string | null;
        emailVerified: boolean;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map