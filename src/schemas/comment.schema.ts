import { object, string, TypeOf } from 'zod';

// Definimos el esquema de validación para la creación de comentarios
const createCommentSchema = object({
    content: string({ required_error: "Content is required" }).min(1, "Content must be at least 1 character long"),
    parent: string().optional(), 
});

// Definimos el esquema de validación para actualizar comentarios
const updateCommentSchema = object({
    id: string({ required_error: "Comment ID is required" }),
    content: string().min(1, "Content must be at least 1 character long").optional(),
});

// Exportamos los tipos para su uso en los controladores o servicios
export type CreateCommentInput = TypeOf<typeof createCommentSchema>;
export type UpdateCommentInput = TypeOf<typeof updateCommentSchema>;

export { createCommentSchema, updateCommentSchema };
