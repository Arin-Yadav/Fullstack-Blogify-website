import { handleError } from "../helpers/handleError.js";
import Comment from "../models/comment.js";

async function createComment(req, res, next) {
  try {
    const { author, blogid, comment } = req.body;
    const comments = await Comment.create({
      author: author,
      blogid: blogid,
      comment: comment,
    });

    res.status(200).json({
      success: true,
      message: "Comment Submitted.",
      comment: comments,
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

async function getComments(req, res, next) {
  try {
    const { blogid } = req.params;
    const comments = await Comment.find({ blogid })
      .populate("author", "fullName avatar")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      comments,
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

async function getAllComments(req, res, next) {
  try {
    const comments = await Comment.find()
      .sort({ createdAt: -1 })
      .populate("blogid", "title")
      .populate("author", "fullName");

    res.status(200).json({
      comments,
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

async function deleteComment(req, res, next) {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: "comment deleted successfully",
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

export { createComment, getComments, getAllComments, deleteComment };
