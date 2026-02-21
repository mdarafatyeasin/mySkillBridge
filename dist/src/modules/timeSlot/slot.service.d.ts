import { TimeSlot } from "../../../generated/prisma/client";
export declare const getTeacherId: (user_id: string) => Promise<string | undefined>;
export declare const slotService: {
    createSlot: (data: Omit<TimeSlot, "id" | "tutor_id" | "createdAt" | "updateAt">, user_id: string) => Promise<{
        id: string;
        tutor_id: string;
        created_at: Date;
        updated_at: Date;
        start_time: Date;
        end_time: Date;
        available: boolean;
    }>;
};
//# sourceMappingURL=slot.service.d.ts.map