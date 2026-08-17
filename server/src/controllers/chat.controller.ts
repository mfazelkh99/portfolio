// controllers/chat.controller.ts
import { Request, Response } from "express";
import { db } from "../database";

export async function getChatHistory(req: Request, res: Response) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        const userId = req.user.userId;

        // ۱. پیدا کردن Conversation بازِ این کاربر
        const [convRows] = await db.execute(
            "SELECT id FROM conversations WHERE user_id = ? AND status = 'open' LIMIT 1",
            [userId]
        );

        const convs = convRows as any[];

        // اگر کاربر چت بازی ندارد، یعنی تاریخچه‌ای هم وجود ندارد
        if (convs.length === 0) {
            return res.status(200).json({
                success: true,
                messages: []
            });
        }

        const conversationId = convs[0].id;

        // ۲. واکشی تمام پیام‌های مربوط به این Conversation به ترتیب زمان ایجاد
        const [messageRows] = await db.execute(
            `SELECT id, conversation_id, sender_id, content, created_at 
             FROM messages 
             WHERE conversation_id = ? 
             ORDER BY created_at ASC`,
            [conversationId]
        );

        return res.status(200).json({
            success: true,
            messages: messageRows
        });

    } catch (error) {
        console.error("Error fetching chat history:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}