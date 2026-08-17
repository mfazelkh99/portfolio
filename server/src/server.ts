// server.ts
import express from "express";
import http from "http"; // ماژول http اضافه شد
import { Server } from "socket.io"; // اضافه شد
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./database";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import cookieParser from "cookie-parser";
import setupChatSocket from "./sockets/chat.socket"; // اضافه شد
import chatRoutes from "./routes/chat.routes";

dotenv.config();

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: "http://localhost:3000", // آدرس دقیق فرانت‌اند
    credentials: true // اجازه ارسال و دریافت کوکی
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);

// ۱. ساخت سرور HTTP
const server = http.createServer(app);

// ۲. راه‌اندازی Socket.io روی سرور HTTP
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true // این خط اضافه شود
    }
});

// ۳. اتصال منطق چت به سوکت
setupChatSocket(io);

async function startServer() {
    try {
        const connection = await db.getConnection();
        console.log("MySQL connected successfully.");
        connection.release();

        // ⚠️ مهم: اینجا app.listen را به server.listen تغییر دادیم
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("MySQL connection failed:", error);
    }
}

startServer();