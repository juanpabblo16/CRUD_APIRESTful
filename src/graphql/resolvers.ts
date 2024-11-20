import { CommentDocument, CommentInput } from "../models/comment.model";
import { ReactionDocument, ReactionInput } from "../models/reaction.model";
import { UserInput,UserDocument } from "../models/user.model";
import commentService from "../services/comment.service";
import reactionService from "../services/reaction.service";
import userService from "../services/user.service";

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

    users: async () => {
        const users: UserDocument[] = await userService.findAll();
        return users;
    },
  
    comments: async () => {
      try {
        const comments: CommentDocument[] = await commentService.findAll();
        return comments;
      } catch (error) {
        throw new Error("Error fetching comments: ");
      }
    },

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

    reactions: async () => {
      try {
        const reactions: ReactionDocument[] = await reactionService.getAll();
        return reactions;
      } catch (error) {
        throw new Error("Error fetching reactions: ");
      }
    },

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

    reactionsByComment: async (_root: any, params: { commentId: string }) => {
      try {
        const reactions: ReactionDocument[] = await reactionService.getReactionsByComment(params.commentId);
        return reactions;
      } catch (error) {
        throw new Error("Error fetching reactions by comment: ");
      }
    },

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

    createUser: async (_root: any, params: { input: UserInput }) => {
      const userOutput: UserDocument = await userService.create(params.input);
      return userFragment(userOutput);
    },

    login: async (_root: any, params: { email: string; password: string }) => {
      try {
        const { token } = await userService.login(params);
    
        return {
          token,
        };
      } catch (error) {
        throw new Error("Authentication failed");
      }
    },

    updateUser: async (_root: any, params: { id: string, input: UserInput }) => {
      const userOutput: UserDocument | null = await userService.update(params.id, params.input);
      if (!userOutput) {
        throw new Error("User not found or could not be updated");
      }
      return userFragment(userOutput);
    },

    deleteUser: async (_root: any, params: { id: string }) => {
      const deletedUser: UserDocument | null = await userService.delete(params.id);
      if (!deletedUser) {
        throw new Error("User not found or could not be deleted");
      }
      return true;
    },

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
        throw new Error(`Error creating comment: ${error}`);
      }
    },

    updateComment: async (_root: any, { id, content }: { id: string, content: string }) => {
      try {
        const commentOutput: CommentDocument | null = await commentService.update(id, { content });

        if (!commentOutput) {
          throw new Error("Comment not found or could not be updated");
        }

        return commentOutput;
      } catch (error) {
        throw new Error(`Error updating comment: ${error}`);
      }
    },
  
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

    createReaction: async (_root: any, params: {input: ReactionInput} ) => {
      try {
        const reaction = await reactionService.create(params.input);
  
        return reaction;
      } catch (error) {
        throw new Error(`Error al crear la reacción: ${error}`);
      }
    },

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
