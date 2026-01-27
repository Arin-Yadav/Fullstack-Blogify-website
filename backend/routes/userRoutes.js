import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userControllers.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.get("/get-user/:userid", getUser);
router.put("/update-user/:userid", upload.single("file"), updateUser);
router.get("/get-all-users", getAllUsers);
router.delete("/delete/:userid", deleteUser);

// module.exports = router;
export default router;
