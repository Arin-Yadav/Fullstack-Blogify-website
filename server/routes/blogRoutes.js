const express = require("express")
const { getBlogs, createBlogs, updateBlogs, deleteBlogs } = require("../controllers/blogControllers")
const { checkForAuthentication } = require("../middlewares/authMiddleware")
const router = express.Router()

router.use(checkForAuthentication)

router.post("/", checkForAuthentication, createBlogs)
router.get("/", getBlogs)
router.put("/:id", updateBlogs)
router.delete("/:id", deleteBlogs)

module.exports = router