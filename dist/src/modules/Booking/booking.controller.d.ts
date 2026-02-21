import { Request, Response } from "express";
export declare const bookingController: {
    createBooking: (req: Request, res: Response) => Promise<void>;
    getMyBooking: (req: Request, res: Response) => Promise<void>;
    getMyBookingById: (req: Request, res: Response) => Promise<void>;
    updateMyBooking: (req: Request, res: Response) => Promise<void>;
    updateTeacherBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getTeacherBooking: (req: Request, res: Response) => Promise<void>;
    getAllBooking: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=booking.controller.d.ts.map