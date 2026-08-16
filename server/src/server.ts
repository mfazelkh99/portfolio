import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./database";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

async function startServer() {
    try {
        const connection = await db.getConnection();

        console.log("MySQL connected successfully.");

        connection.release();

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("MySQL connection failed:", error);
    }
}

startServer();