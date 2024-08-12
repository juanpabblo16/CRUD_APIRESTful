import express, {Request, Response} from "express";
import postController from "../controllers/post.controller";

export const router = express.Router();

router.post("/", postController.create);

router.get("/:id", postController.get);

router.get("/", postController.getAll);

router.put("/:id", postController.update);

router.delete("/:id", postController.delete);

