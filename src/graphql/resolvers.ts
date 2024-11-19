import { UserDocument, UserInput } from "../models/user.model";
import { CommentDocument, CommentInput } from "../models/comment.model";
import { ReactionDocument, ReactionInput } from "../models/reaction.model";
import userService from "../services/user.service";
import commentService from "../services/comment.service";
import reactionService from "../services/reaction.service";

export const resolvers = {
    Query: {
        // Obtener un usuario por ID
        user: async (_root: any, params: { id: string }) => {
            const user: UserDocument | null = await userService.findById(params.id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        },

        // Obtener todos los usuarios
        users: async () => {
            const users: UserDocument[] = await userService.findAll();
            return users;
        },

        // Obtener todos los comentarios
        comments: async () => {
            const comments: CommentDocument[] = await commentService.findAll();
            return comments;
        },

        // Obtener una reacción por ID
        reaction: async (_root: any, params: { id: string }) => {
            const reaction: ReactionDocument | null = await reactionService.findById(params.id);
            if (!reaction) {
                throw new Error('Reaction not found');
            }
            return reaction;
        },

        reactions: async () => {
            const reactions: ReactionDocument[] = await reactionService.getAll();
            return reactions;
        }

    },

    Mutation: {
        // Crear un nuevo usuario
        createUser: async (_root: any, params: { input: UserInput }) => {
            const userOutput: UserDocument = await userService.create(params.input);
            return userOutput;
        },

        // Actualizar un usuario
        updateUser: async (_root: any, params: { id: string, input: UserInput }) => {
            const userOutput: UserDocument | null = await userService.update(params.id, params.input);
            if (!userOutput) {
                throw new Error('User not found or could not be updated');
            }
            return userOutput;
        },

        // Eliminar un usuario
        deleteUser: async (_root: any, params: { id: string }) => {
            const deletedUser: UserDocument | null = await userService.delete(params.id);
            if (!deletedUser) {
                throw new Error('User not found or could not be deleted');
            }
            return true;
        },

        // Crear un nuevo comentario
        createComment: async (_root: any, params: { input: CommentInput }) => {
            const commentOutput: CommentDocument = await commentService.create(params.input);
            return commentOutput;
        },

        // Eliminar un comentario
        deleteComment: async (_root: any, params: { id: string }) => {
            const deletedComment: CommentDocument | null = await commentService.delete(params.id);
            if (!deletedComment) {
                throw new Error('Comment not found or could not be deleted');
            }
            return true;
        },

        // Eliminar una reacción
        deleteReaction: async (_root: any, params: { id: string }) => {
            const deletedReaction: ReactionDocument | null = await reactionService.delete(params.id);
            if (!deletedReaction) {
                throw new Error('Reaction not found or could not be deleted');
            }
            return true;
        }
    }
};