// This file contains the middleware for protecting routes.
// It authenticates a JSON Web Token (JWT) provided in the request headers.

const jwt = require("jsonwebtoken");

/**
 * Middleware function to authenticate a user via a JWT.
 * * It checks for a token in the 'Authorization' header and verifies it.
 * If the token is valid, it attaches the user payload to the request object
 * and calls the next middleware function.
 * * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
const protect = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting: Bearer <token>

  // If no token is provided, return a 401 Unauthorized status.
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token using the secret key from environment variables.
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If the token is invalid, return a 403 Forbidden status.
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    
    // Attach the user information from the token payload to the request.
    req.user = user;
    
    // Move on to the next middleware or route handler.
    next();
  });
};

// We are exporting the 'protect' function within an object.
// This is what allows you to use destructuring: `{ protect } = require(...)`.
module.exports = {
  protect,
};
