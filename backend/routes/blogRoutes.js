import express from 'express'
import { createBlog, deleteBlog, editBlog, getBlog, getBlogByCategory, getRelatedBlog, search, showAllBlog, updateBlog } from '../controllers/blogControllers.js'
import { upload } from "../config/multer.js";

const router = express()

router.post('/add', upload.single('file'), createBlog)
router.get('/edit/:blogid', editBlog)
router.put('/update/:blogid', upload.single('file'), updateBlog)
router.delete('/delete/:blogid', deleteBlog)
router.get('/get-all', showAllBlog)
router.get('/get-blog/:blogSlug', getBlog)
router.get('/get-related-blog/:categorySlug/:blogSlug', getRelatedBlog)
router.get('/get-blog-by-category/:categorySlug', getBlogByCategory)
router.get('/search', search)

export default router