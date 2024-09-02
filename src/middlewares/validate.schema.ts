import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validateSchema = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                params: req.params,
                query: req.query,
            });
            next();
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

export default validateSchema;