import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import Blog from "../models/blog.js";
import { encode } from "entities";

async function createBlog(req, res, next) {
  try {
    const data = JSON.parse(req.body.data);

    let featuredImage = "";
    if (req.file) {
      try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "blog-website",
          resource_type: "auto",
        });

        featuredImage = uploadResult.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return next(handleError(500, error.message || "Internal Server Error"));
      }
    }

    const blog = await Blog.create({
      author: data.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      featuredImage: featuredImage,
      blogcontent: encode(data.blogcontent),
    });

    res.status(200).json({
      success: true,
      message: "Blog created successfully.",
    });
  } catch (error) {
    return next(handleError(500, error.message || "Internal server error"));
  }
}

async function editBlog(req, res, next) {
  try {
    const { blogid } = req.params;
    const blog = await Blog.findById(blogid).populate("category", "name");
    if (!blog) {
      return next(handleError(404, "Data not found"));
    }
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

async function updateBlog(req, res, next) {
  try {
    const { blogid } = req.params;

    const data = JSON.parse(req.body.data);
    console.log(data);
    const blog = await Blog.findById(blogid);
    blog.category = data.category;
    blog.title = data.title;
    blog.slug = data.slug;
    blog.blogcontent = encode(data.blogcontent);

    let featuredImage = blog.featuredImage;
    if (req.file) {
      try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "blog-website",
          resource_type: "auto",
        });

        featuredImage = uploadResult.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return next(handleError(500, error.message || "Internal Server Error"));
      }
    }
    blog.featuredImage = featuredImage;
  

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
    });
  } catch (error) {
    return next(handleError(500, error.message || "Internal server error"));
  }
}

async function deleteBlog(req, res, next) {
  try {
    const { blogid } = req.params;
    const blog = await Blog.findByIdAndDelete(blogid);
    res.status(200).json({
      success: true,
      message: "BLog deleted successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

async function showAllBlog(req, res, next) {
  try {
    const blog = await Blog.find()
      .populate("author", "fullName avatar")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({
      blog,
    });
  } catch (error) {
    return next(handleError(500, error.message || "Internal server error"));
  }
}

export { createBlog, editBlog, updateBlog, deleteBlog, showAllBlog };
