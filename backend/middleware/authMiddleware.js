const jwt = require('jsonwebtoken');

// Middleware to protect routes by verifying JWT token
const authMiddleware = (req, res, next) => {
    try{

    // Get token from header
    const token = req.cookies.token;
    
    // Need to check if there is no token provided
    if (!token) {
        return res.status(401).json({msg: 'No token provided, authorization denied'});
    }

        // Verify token provided
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // UPDATED: Add user from payload (req.user.id)
        req.user = {id: decoded.userId} ; // wrap in an object instead of how it was before
        next(); // proceed to next middleware or route handler

    } catch (error) {
        console.error('JWT verification failed:', error);
        res.status(401).json({msg: 'Token expired or invalid, authorization denied'});
    }
};

module.exports = authMiddleware;