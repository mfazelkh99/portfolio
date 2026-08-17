import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthTokenPayload {
    userId: number;
    role: "visitor" | "admin";
}

export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        // ۱. ابتدا بررسی می‌کنیم که آیا توکن در کوکی وجود دارد (برای بازدیدکنندگان)
        let token;

        // ۱. اولویت با هدر Authorization است (که از Local Storage می‌آید)
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        // ۲. اگر توکنی در هدر نبود، به سراغ کوکی مرورگر می‌رویم (برای ویزیتورها)
        if (!token) {
            token = req.cookies?.chat_token;
        }

        // اگر توکن در هیچ‌کدام پیدا نشد
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as AuthTokenPayload;

        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
}