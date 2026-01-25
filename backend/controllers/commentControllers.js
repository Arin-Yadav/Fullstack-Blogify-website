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
    const comments = await Comment.find({ blogid }).populate('author', 'fullName avatar')
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

export { createComment, getComments };
