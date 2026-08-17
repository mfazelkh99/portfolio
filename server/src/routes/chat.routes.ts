// routes/chat.routes.ts
import { Router } from "express";
import { getChatHistory } from "../controllers/chat.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// این روت نیاز به احراز هویت دارد (از طریق کوکی یا هدر)
router.get("/history", authenticate, getChatHistory);

export default router;