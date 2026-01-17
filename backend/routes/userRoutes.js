const express = require("express");
const { getUser } = require("../controllers/userControllers");

const router = express.Router();

router.get("/get-user/:userid", getUser);

module.exports = router;
