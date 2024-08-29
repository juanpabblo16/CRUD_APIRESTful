import express from "express";
import userController from '../controllers/user.controller';
import validateSchema from "../middlewares/validate.schema";
import userSchema from "../schemas/user.schema";
import loginSchema from "../schemas/login.schema";
import auth from "../middlewares/auth";

export const router = express.Router();

router.post("/", validateSchema(userSchema), userController.create);
router.post("/login", validateSchema(loginSchema), userController.login);

router.get("/", auth, userController.getAll); // Ruta protegida
router.get("/profile", auth, userController.get); // Ruta protegida

router.get("/:id", auth, userController.get); // Ruta protegida
router.put("/:id", auth, userController.update); // Ruta protegida
router.delete("/:id", auth, userController.delete); // Ruta protegida

export default router;
