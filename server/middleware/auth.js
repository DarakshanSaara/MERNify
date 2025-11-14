const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const auth = async (req, res, next) => {
  try {
    let token;
    
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided, access denied'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    // Check if user still exists in database
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'error',
        message: 'User no longer exists'
      });
    }

    // Add user to request object for next middleware
    req.user = currentUser;
    req.userId = currentUser._id;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Token is not valid'
    });
  }
};

// Optional auth middleware (for routes that work with or without auth)
const optionalAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      const currentUser = await User.findById(decoded.id);
      
      if (currentUser) {
        req.user = currentUser;
        req.userId = currentUser._id;
      }
    }
    next();
  } catch (error) {
    next(); // Continue without authentication
  }
};

module.exports = { auth, optionalAuth };