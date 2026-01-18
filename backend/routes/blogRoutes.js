// const express = require("express")
// const { getBlogs, createBlogs, updateBlogs, deleteBlogs } = require("../controllers/blogControllers")
// const router = express.Router()
import express from "express";
import {
  getBlogs,
  createBlogs,
  updateBlogs,
  deleteBlogs,
} from "../controllers/blogControllers.js";
const router = express.Router();

router.post("/", createBlogs);
router.get("/", getBlogs);
router.put("/:id", updateBlogs);
router.delete("/:id", deleteBlogs);

// module.exports = router;
export default router;
