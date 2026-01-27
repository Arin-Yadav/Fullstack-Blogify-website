import express from 'express'
import { createBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogByCategory, getRelatedBlog, search, showAllBlog, updateBlog } from '../controllers/blogControllers.js'
import { upload } from "../config/multer.js";
import { checkForAuthentication } from '../middlewares/authMiddleware.js';

const router = express()

router.post('/add', checkForAuthentication , upload.single('file'), createBlog)
router.get('/edit/:blogid', checkForAuthentication ,  editBlog)
router.put('/update/:blogid', checkForAuthentication ,  upload.single('file'), updateBlog)
router.delete('/delete/:blogid', checkForAuthentication , deleteBlog)
router.get('/get-all', checkForAuthentication, showAllBlog)

router.get('/get-blog/:blogSlug', getBlog)
router.get('/get-related-blog/:categorySlug/:blogSlug', getRelatedBlog)
router.get('/get-blog-by-category/:categorySlug', getBlogByCategory)
router.get('/search', search)

router.get('/blogs', getAllBlogs)


export default router