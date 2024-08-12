import {Request, Response} from "express";

class postController {
    public create(req: Request,res: Response){
        res.send("Post posts")
    }

    public get(req: Request,res: Response){
        res.send('get posts with id ${req.params.id}')
    }

    public getAll(req: Request,res: Response){
        res.send("getAll posts")
    }

    public update(req: Request,res: Response){
        res.send('put posts ${req.params.id')
    }

    public delete(req: Request,res: Response){
        res.send('Delete posts ${req.params.id')
    }
}

export default new postController();