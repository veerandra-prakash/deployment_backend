const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ 
        success: false,
        message: "Authentication required. Please provide a valid token." 
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "Token missing" 
      });
    }

    const jwtSecret = process.env.JWT_SECRET || "dev-secret-key";
    const decoded = jwt.verify(token, jwtSecret);
    
    if (!decoded.id || !decoded.role) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid token payload" 
      });
    }

    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: "Token expired. Please login again." 
      });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: "Invalid token. Please login again." 
      });
    }
    res.status(401).json({ 
      success: false,
      message: "Authentication failed" 
    });
  }
};
