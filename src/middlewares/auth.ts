import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
    // Obtener el token del encabezado Authorization
    let token = req.header("Authorization");
    
    // Verificar si el encabezado contiene el token y eliminar el prefijo 'Bearer '
    token = token?.replace("Bearer ", "");

    // Si no hay token, retornar un error de autorización
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        // Verificar y decodificar el token usando la clave secreta
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
        
        // Agregar la información decodificada al objeto de solicitud
        req.body.loggedUser = decoded;
        req.params.id = decoded.id;

        // Continuar con el siguiente middleware o controlador
        next();
    } catch (error) {
        // Manejar diferentes tipos de errores de JWT
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({ msg: "Token expired, authorization denied" });
        }
        res.status(401).json({ msg: "Invalid token, authorization denied" });
    }
};

export default auth;
