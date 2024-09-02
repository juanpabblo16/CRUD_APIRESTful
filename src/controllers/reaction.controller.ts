import { Request, Response } from 'express';
import ReactionService from '../services/reaction.service';
import { ReactionDocument } from '../models/reaction.model';

class ReactionController {
    public async create(req: Request, res: Response) {
        try {
            const { type, comment } = req.body;
            const userId = req.body.loggedUser.id; // El usuario autenticado

            const reaction = await ReactionService.create({ type, comment, user: userId });
            res.status(201).json(reaction);
        } catch (error) {
            res.status(500).json({ message: "Error creating reaction", error });
        }
    }

    public async get(req: Request, res: Response) {
        try {
            const reactionId = req.params.id;
            const reaction = await ReactionService.findById(reactionId);
            if (!reaction) {
                return res.status(404).json({ message: `Reaction with id: ${reactionId} not found` });
            }
            res.json(reaction);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving reaction", error });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const reactionId = req.params.id;
            const userId = req.body.loggedUser.id;

            // Lógica para verificar si el usuario puede eliminar esta reacción
            const reaction = await ReactionService.findById(reactionId);
            if (!reaction) {
                return res.status(404).json({ message: `Reaction with id: ${reactionId} not found` });
            }

            if (reaction.user.toString() !== userId.toString()) {
                return res.status(403).json({ message: "You are not authorized to delete this reaction" });
            }

            await ReactionService.delete(reactionId);
            res.json({ message: `Reaction with id: ${reactionId} deleted successfully` });
        } catch (error) {
            res.status(500).json({ message: "Error deleting reaction", error });
        }
    }
}

export default new ReactionController();
