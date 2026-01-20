import express from "express";
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from "../controllers/categoryControllers.js";
const router = express.Router();


router.get("/show/:categoryid", showCategory);
router.post("/add", addCategory);
router.put("/update/:categoryid", updateCategory);
router.delete("/delete/:categoryid", deleteCategory);
router.get("/all-category", getAllCategory);

export default router;
