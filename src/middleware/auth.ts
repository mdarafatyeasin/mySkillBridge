import { NextFunction, Request, Response } from "express"
import { auth as betterAuth } from "../lib/auth"

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                name: string,
                email: string,
                role: string,
                emailVerified: boolean
            }
        }
    }
}

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    TEACHER = "TEACHER"
}

export const auth = (...roles: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const session = await betterAuth.api.getSession({
            headers: req.headers as any
        })

        if (!session) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized!"
            })
        }
        if (!session.user.emailVerified) {
            return res.status(403).json({
                success: false,
                message: "Email verification required. Please verify your email!"
            })
        }
        // now you can use the data by using ************ req.user ************
        req.user = {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            role: session.user.role as string,
            emailVerified: session.user.emailVerified
        }

        if (roles.length && !roles.includes(req.user.role as UserRole)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden! You don't have permission to access this path"
            })
        }
        next();
    }
}