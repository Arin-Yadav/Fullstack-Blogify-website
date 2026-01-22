import express from 'express'
import { createBlog, deleteBlog, editBlog, showAllBlog, updateBlog } from '../controllers/blogControllers.js'
import { upload } from "../config/multer.js";

const router = express()

router.post('/add', upload.single('file'), createBlog)
router.get('/edit/:blogid', editBlog)
router.put('/update/:blogid', upload.single('file'), updateBlog)
router.delete('/delete/:blogid', deleteBlog)
router.get('/get-all', showAllBlog)

export default router