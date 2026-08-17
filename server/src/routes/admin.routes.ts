import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";
import { getConversations, getConversationMessages } from "../controllers/admin.controller";

const router = Router();

// اعمال میدل‌ورها روی تمام روت‌های این فایل (فقط ادمین دسترسی دارد)
router.use(authenticate, requireRole("admin"));

// روت تستی قبلی
router.get("/test", (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to the admin area.", user: req.user });
});

// روت‌های جدید
router.get("/conversations", getConversations);
router.get("/conversations/:id/messages", getConversationMessages);

export default router;