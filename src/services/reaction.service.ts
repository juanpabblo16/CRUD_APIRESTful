import Reaction, { ReactionDocument } from "../models/reaction.model";
import { CreateReactionInput } from "../schemas/reaction.schema";

class ReactionService {
    // Método para crear una nueva reacción
    public async create(data: CreateReactionInput & { user: string }): Promise<ReactionDocument> {
        try {
            const reaction = await Reaction.create(data);
            return reaction;
        } catch (error) {
            // Asegurarse de que error es de tipo Error
            if (error instanceof Error) {
                throw new Error("Error creating reaction: " + error.message);
            }
            throw new Error("Unknown error occurred while creating reaction");
        }
    }

    // Método para obtener todas las reacciones de un comentario
    public async getReactionsByComment(commentId: string): Promise<ReactionDocument[]> {
        try {
            const reactions = await Reaction.find({ comment: commentId }).populate("user", "name email");
            return reactions;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error retrieving reactions: " + error.message);
            }
            throw new Error("Unknown error occurred while retrieving reactions");
        }
    }

    // Método para obtener todas las reacciones de un usuario
    public async getReactionsByUser(userId: string): Promise<ReactionDocument[]> {
        try {
            const reactions = await Reaction.find({ user: userId }).populate("comment", "content");
            return reactions;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error retrieving user reactions: " + error.message);
            }
            throw new Error("Unknown error occurred while retrieving user reactions");
        }
    }

    public async findById(id: string): Promise<ReactionDocument | null> {
        try {
            return await Reaction.findById(id).populate('user').populate('comment');
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<ReactionDocument | null> {
        try {
            return await Reaction.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}

export default new ReactionService();
