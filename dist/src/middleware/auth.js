import { auth as betterAuth } from "../lib/auth";
export var UserRole;
(function (UserRole) {
    UserRole["USER"] = "USER";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["TEACHER"] = "TEACHER";
})(UserRole || (UserRole = {}));
export const auth = (...roles) => {
    return async (req, res, next) => {
        const session = await betterAuth.api.getSession({
            headers: req.headers
        });
        if (!session) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized!"
            });
        }
        if (!session.user.emailVerified) {
            return res.status(403).json({
                success: false,
                message: "Email verification required. Please verify your email!"
            });
        }
        // now you can use the data by using ************ req.user ************
        req.user = {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            role: session.user.role,
            emailVerified: session.user.emailVerified
        };
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden! You don't have permission to access this path"
            });
        }
        next();
    };
};
//# sourceMappingURL=auth.js.map