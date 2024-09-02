import express from "express";
import CommentController from "../controllers/comment.controller";
import validateSchema from "../middlewares/validate.schema";
import auth from "../middlewares/auth";
import { createCommentSchema, updateCommentSchema } from "../schemas/comment.schema";

export const router = express.Router();

router.post("/", auth, validateSchema(createCommentSchema), CommentController.create);
router.get("/", auth, CommentController.getAll);
router.put("/:id", auth, validateSchema(updateCommentSchema), CommentController.update);
router.delete("/:id", auth, CommentController.delete);

export default router;