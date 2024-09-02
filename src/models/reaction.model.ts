import mongoose from "mongoose";

export interface ReactionInput {
    type: string;  // Tipo de reacción: 'like', 'love', 'disagree', etc.
    user: mongoose.Types.ObjectId;  // ID del usuario que reacciona
    comment: mongoose.Types.ObjectId;  // ID del comentario al que se reacciona
}

export interface ReactionDocument extends ReactionInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const reactionSchema = new mongoose.Schema({
    type: { type: String, enum: ["like", "love", "disagree"], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
}, { timestamps: true, collection: "reactions" });

const Reaction = mongoose.model<ReactionDocument>("Reaction", reactionSchema);

export default Reaction;
