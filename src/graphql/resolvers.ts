import { UserDocument } from "../models/user.model";
import { CommentDocument, CommentInput } from "../models/comment.model";
import { ReactionDocument, ReactionInput } from "../models/reaction.model";
import commentService from "../services/comment.service";
import reactionService from "../services/reaction.service";
import userService from "../services/user.service";
import {ObjectId } from 'mongoose';

// Fragmento de usuario para reutilizar en consultas
const userFragment = (user: UserDocument) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

export const resolvers = {
  Query: {
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
      try {
        const comments: CommentDocument[] = await commentService.findAll();
        return comments;
      } catch (error) {
        throw new Error("Error fetching comments: ");
      }
    },

    // Obtener un comentario por ID
    comment: async (_root: any, params: { id: string }) => {
      try {
        const comment: CommentDocument | null = await commentService.findById(params.id);
        if (!comment) {
          throw new Error("Comment not found");
        }
        return comment;
      } catch (error) {
        throw new Error("Error fetching comment: ");
      }
    },

    // Obtener todas las reacciones
    reactions: async () => {
      try {
        const reactions: ReactionDocument[] = await reactionService.getAll();
        return reactions;
      } catch (error) {
        throw new Error("Error fetching reactions: ");
      }
    },

    // Obtener una reacción por ID
    reaction: async (_root: any, params: { id: string }) => {
      try {
        const reaction: ReactionDocument | null = await reactionService.findById(params.id);
        if (!reaction) {
          throw new Error("Reaction not found");
        }
        return reaction;
      } catch (error) {
        throw new Error("Error fetching reaction: ");
      }
    },

    // Obtener reacciones por comentario
    reactionsByComment: async (_root: any, params: { commentId: string }) => {
      try {
        const reactions: ReactionDocument[] = await reactionService.getReactionsByComment(params.commentId);
        return reactions;
      } catch (error) {
        throw new Error("Error fetching reactions by comment: ");
      }
    },

    // Obtener reacciones por usuario
    reactionsByUser: async (_root: any, params: { userId: string }) => {
      try {
        const reactions: ReactionDocument[] = await reactionService.getReactionsByUser(params.userId);
        return reactions;
      } catch (error) {
        throw new Error("Error fetching reactions by user: ");
      }
    },
  },

  Mutation: {
    // Crear un nuevo comentario
    createComment: async (_root: any, params: { input: CommentInput }) => {
      try {
        const { input } = params;
        const user = await userService.findById(input.user.toString());
        if (!user) {
          throw new Error("User not found");
        }

        const commentOutput: CommentDocument = await commentService.create(input);
        return {
          ...commentOutput.toObject(),
          user: userFragment(user),
        };
      } catch (error) {
        throw new Error("Error creating comment: ");
      }
    },

    // Actualizar un comentario
    // Actualizar un comentario
    updateComment: async (_root: any, { id, content }: { id: string, content: string }) => {
        try {
        // Aquí estamos pasando un objeto con la estructura esperada por `update`
        const commentOutput: CommentDocument | null = await commentService.update(id, { content });
    
        if (!commentOutput) {
            throw new Error("Comment not found or could not be updated");
        }
    
        return commentOutput;
        } catch (error) {
        throw new Error("Error updating comment: ");
        }
    },
  
    // Eliminar un comentario
    deleteComment: async (_root: any, params: { id: string }) => {
      try {
        const deletedComment: CommentDocument | null = await commentService.delete(params.id);
        if (!deletedComment) {
          throw new Error("Comment not found or could not be deleted");
        }
        return true;
      } catch (error) {
        throw new Error("Error deleting comment: ");
      }
    },

    // Crear una nueva reacción
    createReaction: async (_root: any, { input }: { input: ReactionInput }) => {
        try {
            const user = await userService.findById(input.user.toString());
            const comment = await commentService.findById(input.comment.toString());
    
            console.log(user + " " +comment)
            if (!user) {
                throw new Error("User not found");
            }
            if (!comment) {
                throw new Error("Comment not found");
            }
    
            // Crear la reacción, asegurándote de que los ObjectIds se convierten a string si es necesario
            const reactionOutput = await reactionService.create({
                type: input.type,
                comment: input.comment.toString(),  // Convertir ObjectId a string si es necesario
                user: input.user.toString(),        // Convertir ObjectId a string si es necesario
            });
    
            return reactionOutput;
        } catch (error) {
            throw new Error("Error creating reaction: "+ error);
        }
    },
    
    // Eliminar una reacción
    deleteReaction: async (_root: any, params: { id: string }) => {
      try {
        const deletedReaction: ReactionDocument | null = await reactionService.delete(params.id);
        if (!deletedReaction) {
          throw new Error("Reaction not found or could not be deleted");
        }
        return true;
      } catch (error) {
        throw new Error("Error deleting reaction: ");
      }
    },
  },

  // Fragmentos para campos repetidos, como los usuarios asociados a comentarios y reacciones
  User: {
    id: (user: UserDocument) => user.id,
    name: (user: UserDocument) => user.name,
    email: (user: UserDocument) => user.email,
  },

  Comment: {
    user: async (comment: CommentDocument) => {
      const user = await userService.findById(comment.user.toString());
      return user ? userFragment(user) : null;
    },
    parent: async (comment: CommentDocument) => {
      if (comment.parent) {
        const parentComment = await commentService.findById(comment.parent.toString());
        return parentComment;
      }
      return null;
    },
  },

  Reaction: {
    user: async (reaction: ReactionDocument) => {
      const user = await userService.findById(reaction.user.toString());
      return user ? userFragment(user) : null;
    },
    comment: async (reaction: ReactionDocument) => {
      const comment = await commentService.findById(reaction.comment.toString());
      return comment;
    },
  },
};
