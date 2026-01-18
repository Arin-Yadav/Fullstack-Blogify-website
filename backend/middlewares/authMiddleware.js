// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

function checkForAuthentication(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    // const cookieToken = req.cookies.access-token; // If using cookies instead of headers
    // const decodedToken = jwt.verify(cookieToken, process.env.JWT_SECRET);
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken; // why req.user -> because Your verifyToken middleware (used in blogRoutes.js) decodes the JWT and attaches the user info to req.user. That makes req.user.id available in any controller that runs after the middleware.
    // This way, you can easily access the authenticated user's ID and other details without needing to decode the token again.
    // This is essential for routes that require user authentication, such as creating or managing blog posts.
    // Proceed to the next middleware or route handler
    // So basically the req.user => user is just the property(we create) of req object and ofcourse you name anything other than "user" but it is a standard practice.
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// module.exports = {
//   checkForAuthentication,
// };
export { checkForAuthentication };
