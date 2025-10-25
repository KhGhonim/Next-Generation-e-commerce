import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Generate JWT Token
export const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  return jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });
};

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token;

  // Check for token in cookies first, then headers
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }

  try {
    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET environment variable is not set",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token (cast decoded to access userId)
    const userId =
      typeof decoded === "object" && decoded.userId ? decoded.userId : null;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No user found with this token",
      });
    }

    // Check if user is still active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User account has been deactivated",
      });
    }

    req.user = { userId };
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: `User role ${user.role} is not authorized to access this route`,
        });
      }

      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error during authorization",
      });
    }
  };
};

