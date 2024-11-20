import Reaction, { ReactionDocument, ReactionInput } from "../models/reaction.model";
import Comment from "../models/comment.model";
import User from "../models/user.model";

class ReactionService {
    public async create(data: ReactionInput): Promise<ReactionDocument> {
        try {
            const { user, comment, type } = data;

            const userExists = await User.findById(user);
            if (!userExists) {
                throw new Error("Usuario no encontrado");
            }

            const commentExists = await Comment.findById(comment);
            if (!commentExists) {
                throw new Error("Comentario no encontrado");
            }

            const existingReaction = await Reaction.findOne({ user, comment });
            if (existingReaction) {
                throw new Error("Ya has reaccionado a este comentario");
            }

            const reaction = await Reaction.create({ user, comment, type });
            return reaction;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error creating reaction: " + error.message);
            }
            throw new Error("Unknown error occurred while creating reaction");
        }
    }

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

    public async getAll(): Promise<ReactionDocument[]>{
        try{
            const reactions = await Reaction.find();
            return reactions;
        }catch (error){
            throw error;
        }
    }
}

export default new ReactionService();
