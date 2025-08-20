// --- src/middleware/auth.js (Example path for a dedicated middleware file) ---
const jwt = require('jsonwebtoken'); // Ensure jwt is installed: npm install jsonwebtoken

const protect = (req, res, next) => {
    let token;

    // Check for token in Authorization header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user ID from token to the request object
            // This makes the user ID available in subsequent route handlers
            req.userId = decoded.id; 
            next(); // Proceed to the next middleware/route handler
        } catch (error) {
            console.error('❌ JWT verification failed:', error);
            return res.status(401).json({ message: 'Not authorized, token failed.' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token.' });
    }
};

module.exports = { protect };
