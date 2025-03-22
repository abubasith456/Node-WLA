import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import authRouter from "./router/authRouter.js";
import categoryRoutes from "./router/categoryRoutes.js";
import productRoutes from "./router/productsRouter.js";
import bannerRoutes from "./router/bannnerRouter.js"
import offersRoutes from "./router/offerRoutes.js"

dotenv.config();
const BASE_API_PATH = "/api/v1";

const app = express();

// Middleware Setup
const setupMiddleware = () => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(morgan("dev"));
};

setupMiddleware();

// API Routes
app.use(`${BASE_API_PATH}/user`, authRouter);
app.use(`${BASE_API_PATH}/categories`, categoryRoutes);
app.use(`${BASE_API_PATH}/products`, productRoutes);
app.use(`${BASE_API_PATH}/banners`, bannerRoutes);
app.use(`${BASE_API_PATH}/offers`, offersRoutes);

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1); // Exit the process if DB connection fails
    }
};

connectDB();

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 Internal Server Error:", err.message);
    res.status(500).json({ status: "error", message: "Something went wrong!" });
});

// Graceful Shutdown
process.on("SIGINT", async () => {
    console.log("🔻 Shutting down server...");
    await mongoose.disconnect();
    console.log("🛑 MongoDB Disconnected");
    process.exit(0);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
