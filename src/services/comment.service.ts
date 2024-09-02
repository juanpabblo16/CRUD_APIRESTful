import CommentModel, { CommentDocument, CommentInput } from "../models/comment.model";

class CommentService {
    public async create(commentInput: CommentInput): Promise<CommentDocument> {
        try {
            const comment = await CommentModel.create(commentInput);
            return comment;
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<CommentDocument[]> {
        try {
            return await CommentModel.find().populate("user").populate("parent");
        } catch (error) {
            throw error;
        }
    }

    public async update(id: string, commentInput: Partial<CommentInput>): Promise<CommentDocument | null> {
        try {
            const comment = await CommentModel.findByIdAndUpdate(id, commentInput, { new: true });
            return comment;
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<CommentDocument | null> {
        try {
            return await CommentModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}

export default new CommentService();
