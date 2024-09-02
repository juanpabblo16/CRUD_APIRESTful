import express from "express";
import ReactionController from "../controllers/reaction.controller";
import validateSchema from "../middlewares/validate.schema";
import auth from "../middlewares/auth";
import { createReactionSchema, deleteReactionSchema } from "../schemas/reaction.schema";

export const router = express.Router();

router.post("/", auth, validateSchema(createReactionSchema), ReactionController.create);
router.delete("/:id", auth, validateSchema(deleteReactionSchema), ReactionController.delete);
router.get("/:id", auth, ReactionController.get)
export default router;
 