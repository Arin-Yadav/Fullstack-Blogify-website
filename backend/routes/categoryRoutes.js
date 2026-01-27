import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  showCategory,
  updateCategory,
} from "../controllers/categoryControllers.js";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.js";
const router = express.Router();

router.get("/show/:categoryid", adminAuthMiddleware, showCategory);
router.post("/add", adminAuthMiddleware, addCategory);
router.put("/update/:categoryid", adminAuthMiddleware, updateCategory);
router.delete("/delete/:categoryid", adminAuthMiddleware, deleteCategory);
router.get("/all-category", getAllCategory);

export default router;
