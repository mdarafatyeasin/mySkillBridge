import { NextFunction, Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                role: string;
                emailVerified: boolean;
            };
        }
    }
}
export declare enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    TEACHER = "TEACHER"
}
export declare const auth: (...roles: any) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.d.ts.map