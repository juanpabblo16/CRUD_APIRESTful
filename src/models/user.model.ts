import mongoose from "mongoose";

export interface UserInput {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface LoginInput {
    email: string;
    password: string;
}
export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["superadmin", "regular"], default: "regular" }
}, { timestamps: true, collection: "users" });

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
