import { handleError } from "../helpers/handleError.js";
import Category from "../models/category.js";

async function addCategory(req, res, next) {
  try {
    const { name, slug } = req.body;
    const category = await Category.create({
      name,
      slug,
    });

    res.status(200).json({
      success: true,
      message: "Category added successfully.",
      // category,
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

async function showCategory(req, res, next) {
  try {
    const { categoryid } = req.params;
    const category = await Category.findById(categoryid);
    if (!category) {
      return next(handleError(404, "Data not found"));
    }
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

async function updateCategory(req, res, next) {
  try {
    const { name, slug } = req.body;
    const { categoryid } = req.params;
    const category = await Category.findByIdAndUpdate(
      categoryid,
      {
        name,
        slug,
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

async function deleteCategory(req, res, next) {
  try {
    const { categoryid } = req.params;
    const category = await Category.findByIdAndDelete(categoryid);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

async function getAllCategory(req, res, next) {
  try {
    const category = await Category.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal server error"));
  }
}

export {
  addCategory,
  showCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
};
