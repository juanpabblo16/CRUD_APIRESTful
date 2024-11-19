import { UserDocument, UserInput } from "../models/user.model";
import userService from "../services/user.service";

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
            return `User with id: ${params.id} deleted successfully`;
        }
    }
};
