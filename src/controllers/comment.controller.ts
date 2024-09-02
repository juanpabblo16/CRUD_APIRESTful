import { Request, Response } from "express";
import CommentService from "../services/comment.service";
import { CreateCommentInput, UpdateCommentInput } from "../schemas/comment.schema";

class CommentController {
// Método para crear un comentario
public async create(req: Request, res: Response): Promise<Response> {
    try {
        const { content, parent } = req.body; // Datos del cuerpo de la solicitud
        const user = req.body.loggedUser; // Obtenemos el usuario autenticado del middleware de autenticación

        // Verifica si el usuario autenticado está disponible
        if (!user) {
            return res.status(401).json({ message: "Usuario no autenticado." });
        }

        // Crear un comentario utilizando el servicio de comentarios
        const comment = await CommentService.create({ content, parent, user: user.id }); // Asegúrate de pasar el ID de usuario

        return res.status(201).json(comment);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: "Error desconocido al crear el comentario." });
    }
}

    public async getAll(req: Request, res: Response) {
        try {
            const comments = await CommentService.findAll();
            res.json(comments);
        } catch (error) {
            res.status(500).json({ message: "Error fetching comments", error });
        }
    }

    public async update(req: Request<{ id: string }, {}, UpdateCommentInput>, res: Response) {
        try {
            const updatedComment = await CommentService.update(req.params.id, req.body);
            if (!updatedComment) {
                return res.status(404).json({ message: "Comment not found" });
            }
            res.json(updatedComment);
        } catch (error) {
            res.status(500).json({ message: "Error updating comment", error });
        }
    }

    public async delete(req: Request<{ id: string }>, res: Response) {
        try {
            const deletedComment = await CommentService.delete(req.params.id);
            if (!deletedComment) {
                return res.status(404).json({ message: "Comment not found" });
            }
            res.json({ message: "Comment deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting comment", error });
        }
    }
}

export default new CommentController();
