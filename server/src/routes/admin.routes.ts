import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.get(
    "/test",
    authenticate,
    requireRole("admin"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome to the admin area.",
            user: req.user,
        });
    }
);

export default router;