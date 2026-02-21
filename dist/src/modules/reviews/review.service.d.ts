import { Review } from "../../../generated/prisma/client";
export declare const reviewService: {
    createReview: (data: Omit<Review, "id" | "student_id" | "create_at" | "update_at">, user_id: string) => Promise<{
        id: string;
        student_id: string;
        tutor_id: string;
        booking_id: string;
        rating: number;
        comment: string;
        created_at: Date;
        updated_at: Date;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map