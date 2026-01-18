// const express = require("express");
// const { getUser, updateUser } = require("../controllers/userControllers");
// const { upload } = require("../config/multer");
import express from "express";
import { getUser, updateUser } from "../controllers/userControllers.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.get("/get-user/:userid", getUser);
router.put("/update-user/:userid", upload.single("file"), updateUser);

// module.exports = router;
export default router;
