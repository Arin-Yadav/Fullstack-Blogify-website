// const express = require("express")
// const { handleSignUp, handleSignIn, handleSignout } = require("../controllers/authControllers")
// const router = express.Router()
import express from "express";
import {
  handleSignUp,
  handleSignIn,
  handleSignout,
} from "../controllers/authControllers.js";
const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);
router.get("/signout", handleSignout);

// module.exports = router;
export default router;
