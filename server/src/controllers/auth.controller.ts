import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../database";
import crypto from "crypto";

export async function register(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required.",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters.",
            });
        }

        const [existingUsers] = await db.execute(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if ((existingUsers as any[]).length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered.",
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            `
            INSERT INTO users
            (name, email, password_hash)
            VALUES (?, ?, ?)
            `,
            [name, email, passwordHash]
        );

        const userId = (result as any).insertId;

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: {
                id: userId,
                name,
                email,
            },
        });

    } catch (error) {
        console.error("Register error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const [rows] = await db.execute(
            `
            SELECT id, name, email, password_hash, role
            FROM users
            WHERE email = ?
            `,
            [email]
        );

        const users = rows as any[];

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const user = users[0];

        const passwordIsValid = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordIsValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export async function getMe(req: Request, res: Response) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const [rows] = await db.execute(
            `
            SELECT id, name, email, role, created_at
            FROM users
            WHERE id = ?
            `,
            [req.user.userId]
        );

        const users = rows as any[];

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const user = users[0];

        return res.status(200).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.created_at,
            },
        });

    } catch (error) {
        console.error("Get me error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export async function visitorLogin(req: Request, res: Response) {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required for chat.",
            });
        }

        // بررسی اینکه آیا این ایمیل قبلاً در دیتابیس ثبت شده است یا خیر
        const [rows] = await db.execute(
            "SELECT id, name, email, role FROM users WHERE email = ?",
            [email]
        );
        const users = rows as any[];
        let user;

        if (users.length > 0) {
            // کاربر از قبل وجود دارد
            user = users[0];

            // اگر نام جدیدی وارد کرده، می‌توانیم نامش را در دیتابیس آپدیت کنیم
            if (user.name !== name) {
                await db.execute("UPDATE users SET name = ? WHERE id = ?", [name, user.id]);
                user.name = name;
            }
        } else {
            // کاربر جدید است، باید او را به عنوان visitor بسازیم
            // ساخت یک پسورد تصادفی چون دیتابیس به پسورد نیاز دارد
            const randomPassword = crypto.randomBytes(16).toString("hex");
            const passwordHash = await bcrypt.hash(randomPassword, 10);

            const [result] = await db.execute(
                `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, 'visitor')`,
                [name, email, passwordHash]
            );

            user = {
                id: (result as any).insertId,
                name,
                email,
                role: "visitor"
            };
        }

        // ساخت توکن با انقضای طولانی (مثلاً ۳۰ روز) تا چت کاربر زود بسته نشود
        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "30d" }
        );

        // تنظیم توکن در HttpOnly Cookie
        res.cookie("chat_token", token, {
            httpOnly: true, // جاوااسکریپت سمت کلاینت به این کوکی دسترسی نخواهد داشت (برای امنیت)
            secure: process.env.NODE_ENV === "production", // در حالت پروداکشن فقط روی https کار می‌کند
            sameSite: "lax", // جلوگیری از حملات CSRF
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 روز به میلی‌ثانیه
        });

        return res.status(200).json({
            success: true,
            message: "Visitor session started.",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
            // توجه: دیگر توکن را در بدنه ریسپانس نمی‌فرستیم، چون در کوکی تنظیم شد
        });

    } catch (error) {
        console.error("Visitor login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}