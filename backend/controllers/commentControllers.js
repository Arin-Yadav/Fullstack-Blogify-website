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

export { createComment };
