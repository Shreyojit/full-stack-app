import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import restaurantRoutes from './routes/restaurantRoutes.js';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import foodRoutes from './routes/foodRoutes.js'

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the process with failure
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("Mongodb disconnected..");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use("/api/user",userRoutes)
app.use("/api/foods",foodRoutes)


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8800, () => {
    connect();
    console.log("API is working on port 8800...");
});
