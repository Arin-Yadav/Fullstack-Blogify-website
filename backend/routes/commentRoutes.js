import express from "express";
import { createComment, deleteComment, getAllComments, getComments } from "../controllers/commentControllers.js";
const router = express.Router();


router.post("/create", createComment)
router.get("/get-comments/:blogid", getComments)
router.get("/get-all-comments", getAllComments)
router.delete("/delete/:id", deleteComment)

export default router;
