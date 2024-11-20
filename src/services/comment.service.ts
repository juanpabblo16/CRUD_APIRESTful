import CommentModel, { CommentDocument, CommentInput } from "../models/comment.model";
import UserModel from "../models/user.model";
class CommentService {
    public async create(commentInput: CommentInput): Promise<CommentDocument> {
        try {
            const userExists = await UserModel.findById(commentInput.user);
            if (!userExists) {
                throw new Error("Usuario no encontrado");
            }

            if (commentInput.parent) {
                const parentComment = await CommentModel.findById(commentInput.parent);
                if (!parentComment) {
                    throw new Error("Comentario padre no encontrado");
                }
            }

            const comment = await CommentModel.create(commentInput);
            return comment;
        } catch (error) {
            throw new Error(`Error al crear el comentario: ${error}`);
        }
    }

    public async findAll(page: number = 1, limit: number = 10): Promise<CommentDocument[]> {
        try {
            return await CommentModel.find()
                .skip((page - 1) * limit)
                .limit(limit)              
                .populate("user")
                .populate("parent");
        } catch (error) {
            console.error(error);
            throw new Error(`Error al obtener los comentarios: ${error}`);
        }
    }
    
    public async update(id: string, commentInput: Partial<CommentInput>): Promise<CommentDocument | null> {
        try {
            const comment = await CommentModel.findByIdAndUpdate(id, commentInput, { new: true });
            return comment;
        } catch (error) {
            throw new Error(`Error al actualizar el comentario: ${error}`);
        }
    }

    public async findById(id: string): Promise<CommentDocument | null> {
        try {
            return await CommentModel.findById(id)
                .populate('user')
                .populate('parent');
        } catch (error) {
            throw new Error(`Error al obtener el comentario: ${error}`);
        }
    }

    public async delete(id: string): Promise<CommentDocument | null> {
        try {
            const commentToDelete = await CommentModel.findById(id);
            if (!commentToDelete) {
                throw new Error("Comentario no encontrado");
            }
    
            const deletedComment = await CommentModel.findByIdAndDelete(id);
            return deletedComment;
        } catch (error) {
            console.error(error);
            throw new Error(`Error al eliminar el comentario: ${error}`);
        }
    }
}

export default new CommentService();