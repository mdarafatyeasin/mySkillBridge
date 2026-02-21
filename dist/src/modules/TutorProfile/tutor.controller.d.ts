import { Request, Response } from "express";
export declare const tutorController: {
    createTutorProfile: (req: Request, res: Response) => Promise<void>;
    getTutorProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllTutor: (req: Request, res: Response) => Promise<void>;
    getTutorById: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=tutor.controller.d.ts.map