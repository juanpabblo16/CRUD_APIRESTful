import { Request, Response } from "express";
import { UserDocument, UserInput } from "../models/user.model";
import userService from "../services/user.service";

class UserController {
    public async create(req: Request, res: Response) {
        try {
            const user: UserDocument = await userService.create(req.body as UserInput);
            return res.status(201).json(user);            
        } catch (error) {
            if (error instanceof ReferenceError) {
                return res.status(400).json({ message: "User already exists" });
            }
            return res.status(500).json({ message: "Internal server error", error });
        }
    }
    
    public async login(req: Request, res: Response) {
        try {
            const resObj = await userService.login(req.body);
            res.status(200).json(resObj);
        } catch (error) {
            if (error instanceof ReferenceError) {
                res.status(401).json({ message: "Not authorized" });
            } else {
                res.status(500).json({ message: "Internal server error", error });
            }
        }
    }

    public async get(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.findById(req.params.id); 
            if (!user) {
                return res.status(404).json({ message: `User with id:${req.params.id} not found` });
            }
            res.json(user);   
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const users: UserDocument[] = await userService.findAll(); 
            res.json(users);            
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }    
    }

    public async update(req: Request, res: Response) {
        try {
            const loggedUser = req.body.loggedUser;
            if (loggedUser.role !== "superadmin") {
                return res.status(403).json({ message: "Only superadmin can update users." });
            }

            const user: UserDocument | null = await userService.update(req.params.id, req.body as UserInput);
            if (!user) {
                return res.status(404).json({ message: `User with id:${req.params.id} not found` });
            }            
            res.json(user);            
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const loggedUser = req.body.loggedUser;

            // Verificación de permisos adicionales
            if (loggedUser.role !== "superadmin") {
                return res.status(403).json({ message: "Acción denegada: Solo los superadministradores pueden eliminar usuarios." });
            }

            // Evita que un superadmin se elimine a sí mismo
            if (loggedUser.id === userId) {
                return res.status(403).json({ message: "Acción denegada: No puedes eliminar tu propia cuenta." });
            }

            const user = await userService.delete(userId);

            if (!user) {
                return res.status(404).json({ message: `Usuario con id: ${userId} no encontrado.` });
            }

            res.json({ message: `Usuario con id: ${userId} eliminado correctamente.` });
        } catch (error) {
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }
}

export default new UserController();
