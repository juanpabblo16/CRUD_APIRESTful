import { object, string, TypeOf } from 'zod';

// Definimos el esquema de validación para la creación de reacciones
const createReactionSchema = object({
    body: object({
        type: string({ required_error: "Reaction type is required" })
            .refine((val) => ["like", "love", "disagree"].includes(val), {
                message: "Invalid reaction type",
            }),
        comment: string({ required_error: "Comment ID is required" }),
    }),
});

// Definimos el esquema de validación para eliminar una reacción
const deleteReactionSchema = object({
    params: object({
        id: string({ required_error: "Reaction ID is required" }),
    }),
});

// Exportamos los tipos para su uso en los controladores o servicios
export type CreateReactionInput = TypeOf<typeof createReactionSchema>["body"];
export type DeleteReactionInput = TypeOf<typeof deleteReactionSchema>["params"];

export { createReactionSchema, deleteReactionSchema };
