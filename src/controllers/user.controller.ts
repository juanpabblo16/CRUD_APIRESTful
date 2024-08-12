import {Request, Response} from "express";
import { UserDocument, UserInput } from "../models/user.model";
import  userService from "../services/user.service";
import { error } from "console";

class userController {
    public async create(req: Request,res: Response){

        try{
            const user: UserDocument = await userService.create(req.body as UserInput);
            return res.status(201).json(user);
        }catch(e){
            return res.status(201).json(e);
        }
    }

    public async get(req: Request,res: Response){
        try{
            const user: UserDocument | null = await userService.findById(req.params.id);
            if(!user) return res.status(404).json({message: 'User not found'});
            return res.json(user);
        }catch(e){
            return res.status(500).json(error);
        }
    }

    public async getAll(req: Request,res: Response){
        try{
            const users: UserDocument[] = await userService.findAll()
            return res.json(users);
        }catch(e){
            return res.status(500).json(error);
        }
    }

    public async update(req: Request,res: Response){
        try{
            const user: UserDocument | null = await userService.update(req.params.id, req.body as UserInput);
            return res.json(user);
        }catch(e){
            return res.status(500).json(error);
        }
    }

    public delete(req: Request,res: Response){
        res.send('Delete posts ${req.params.id')
    }
}

export default new userController();