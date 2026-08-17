import { Request, Response } from "express";
import { db } from "../database";

// ۱. دریافت لیست گفتگوها به همراه تعداد پیام خوانده نشده
export async function getConversations(req: Request, res: Response) {
    try {
        const [rows] = await db.execute(`
            SELECT c.id as conversation_id, c.status, c.updated_at, u.id as user_id, u.name, u.email,
            (SELECT COUNT(*) FROM messages m WHERE m.conversation_id = c.id AND m.is_read = FALSE AND m.sender_id = u.id) as unread_count
            FROM conversations c
            JOIN users u ON c.user_id = u.id
            ORDER BY c.updated_at DESC
        `);
        return res.status(200).json({ success: true, conversations: rows });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

// ۲. دریافت پیام‌ها و سین (Seen) کردن آن‌ها
export async function getConversationMessages(req: Request, res: Response) {
    try {
        const { id } = req.params;

        // 👈 تغییر جدید: بررسی وجود کاربر برای رفع ارور تایپ‌اسکریپت
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const adminId = req.user.userId; // حالا تایپ‌اسکریپت مطمئن است که این متغیر قطعاً یک عدد است

        // ابتدا پیام‌های این چت که توسط بازدیدکننده ارسال شده را "خوانده شده" می‌کنیم
        await db.execute(`
            UPDATE messages SET is_read = TRUE 
            WHERE conversation_id = ? AND sender_id != ?
        `, [id, adminId]);

        const [rows] = await db.execute(`
            SELECT id, conversation_id, sender_id, content, created_at 
            FROM messages WHERE conversation_id = ? ORDER BY created_at ASC
        `, [id]);

        return res.status(200).json({ success: true, messages: rows });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}