const jwt = require("jsonwebtoken");

function checkForAuthentication(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;  // why req.user -> because Your verifyToken middleware (used in blogRoutes.js) decodes the JWT and attaches the user info to req.user. That makes req.user.id available in any controller that runs after the middleware.
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = {
  checkForAuthentication,
};
