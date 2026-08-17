import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { db } from "../database";
import * as cookie from "cookie"; // این پکیج اضافه شد

interface AuthTokenPayload {
    userId: number;
    role: "visitor" | "admin";
}

interface CustomSocket extends Socket {
    user?: AuthTokenPayload;
}

export default function setupChatSocket(io: Server) {
    // ۱. میدل‌ور برای احراز هویت اتصالات سوکت
    io.use((socket: CustomSocket, next) => {
        // خواندن کوکی‌ها از هدر درخواست سوکت
        const cookieHeader = socket.handshake.headers.cookie || "";
        const cookies = cookie.parseCookie(cookieHeader);

        // استخراج توکن از کوکی‌ای که بک‌اند تنظیم کرده بود
        const token = socket.handshake.auth?.token || cookies.chat_token;

        if (!token) {
            return next(new Error("Authentication required."));
        }

        try {
            // بررسی و اعتبارسنجی توکن با همان JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthTokenPayload;
            socket.user = decoded;
            next();
        } catch (error) {
            return next(new Error("Invalid or expired token."));
        }
    });

    // ۲. مدیریت رویدادهای پس از اتصال موفق
    io.on("connection", (socket: CustomSocket) => {
        const user = socket.user!;
        console.log(`🟢 User connected: ${user.userId} (Role: ${user.role})`);

        const userRoom = `user_${user.userId}`;
        socket.join(userRoom);

        if (user.role === "admin") {
            socket.join("admin_room");
        }

        // دریافت پیام از سمت کاربر یا ادمین
        socket.on("send_message", async (data) => {
            try {
                const { content, conversationId } = data;
                let currentConversationId = conversationId;

                if (user.role === "visitor") {
                    const [convRows] = await db.execute(
                        "SELECT id FROM conversations WHERE user_id = ? AND status = 'open' LIMIT 1",
                        [user.userId]
                    );
                    const convs = convRows as any[];

                    if (convs.length === 0) {
                        const [newConv] = await db.execute(
                            "INSERT INTO conversations (user_id, status) VALUES (?, 'open')",
                            [user.userId]
                        );
                        currentConversationId = (newConv as any).insertId;
                    } else {
                        currentConversationId = convs[0].id;
                    }
                }

                if (currentConversationId && content) {
                    // ذخیره پیام در دیتابیس
                    const [result] = await db.execute(
                        "INSERT INTO messages (conversation_id, sender_id, content) VALUES (?, ?, ?)",
                        [currentConversationId, user.userId, content]
                    );

                    // 👈 پیدا کردن آیدی کاربری که صاحب این چت است (ویزیتور)
                    const [convRows] = await db.execute(
                        "SELECT user_id FROM conversations WHERE id = ?",
                        [currentConversationId]
                    );
                    const visitorId = (convRows as any[])[0].user_id;

                    // ساخت آبجکت پیام
                    const newMessage = {
                        id: (result as any).insertId,
                        conversation_id: currentConversationId,
                        sender_id: user.userId,
                        content: content,
                        created_at: new Date()
                    };

                    // پیام را به اتاق ویزیتور (صاحب چت) و اتاق ادمین‌ها می‌فرستیم
                    io.to(`user_${visitorId}`).emit("receive_message", newMessage);
                    io.to("admin_room").emit("receive_message", newMessage);
                }

            } catch (error) {
                console.error("Error saving message:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log(`🔴 User disconnected: ${user.userId}`);
        });
    });
}