import mongoose from "mongoose";

export interface CommentInput {
    content: string;
    user: mongoose.Types.ObjectId;  // ID del usuario que crea el comentario
    parent?: mongoose.Types.ObjectId;  // ID del comentario padre, en caso de que sea una respuesta
}

export interface CommentDocument extends CommentInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }, // Referencia al comentario padre
}, { timestamps: true, collection: "comments" });

const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export default Comment;
