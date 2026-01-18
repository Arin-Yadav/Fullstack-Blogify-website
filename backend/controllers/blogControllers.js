// const Blog = require("../models/blog");
import Blog from "../models/blog.js";

async function createBlogs(req, res) {
  const { title, content } = req.body;
  const userId = req.user.id;
  const blog = await Blog.create({ title, content, author: userId });
  res.status(201).json(blog);
}

async function getBlogs(req, res) {
  const blogs = await Blog.find().populate("author", "fullName");
  res.json(blogs);
}

// Update a blog
const updateBlogs = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      { title, content },
      { new: true }  // how and how all this
    );

    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog" });
  }
};

// Delete a blog
const deleteBlogs = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id,
    });

    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};

// module.exports = {
//   createBlogs,
//   getBlogs,
//   updateBlogs,
//   deleteBlogs,
// };
export  { createBlogs, getBlogs, updateBlogs, deleteBlogs };