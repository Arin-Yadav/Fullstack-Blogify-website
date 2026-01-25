import express from "express";
import { createComment, getComments } from "../controllers/commentControllers.js";
const router = express.Router();


router.post("/create", createComment)
router.get("/get-comments/:blogid", getComments)

export default router;
