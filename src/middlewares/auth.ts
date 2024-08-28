import { Request, Response, NextFunction } from "express";
import jwt, {TokenExpiredError} from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
    let token = req.header("Authorization");
    token = token?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try{
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
        req.body.loggedUser = decoded;
        req.params.id = decoded.id;
        next();
    } catch (error) {
        if(error instanceof TokenExpiredError){
            return res.status(401).json({ msg: "Token expired, authorization denied" });
        }
        res.status(401).json({ msg: "Invalid token, authorization denied" });
    }
}

export default auth;