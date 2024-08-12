import express, {Request, Response} from "express";
import userController from "../controllers/user.controller";

export const router = express.Router();

router.post("/", userController.create);

router.get("/:id", userController.get);

router.get("/", userController.getAll);

router.put("/:id", userController.update);

router.delete("/:id", userController.delete);

