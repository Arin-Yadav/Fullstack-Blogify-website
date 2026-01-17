const { handleError } = require("../helpers/handleError");
const User = require("../models/user");

async function getUser(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ id: userId });
    if (!user) {
      return next(handleError(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    next(handleError(500, error.message || "Internal Server Error"));
  }
}

module.exports = {
  getUser,
};
