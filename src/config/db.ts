import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGODB_URL || "mongodb://localhost:27017/posts";

export const db = mongoose.connect(connectionString)
    .then(() => console.log("Database MongoDB connected successfully")).catch(
        (err) => console.error("Database connection error: ", err)
    )