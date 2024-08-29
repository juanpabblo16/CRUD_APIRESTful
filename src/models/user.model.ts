import mongoose from "mongoose";

export interface UserInput {
    name: string;
    email: string;
    password: string;
    role: string; // Añadido para roles de usuario
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
    role: { type: String, enum: ["superadmin", "regular"], default: "regular" } // Añadido para roles
}, { timestamps: true, collection: "users" });

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
