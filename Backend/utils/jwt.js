import jwt from "jsonwebtoken";

/**
 * Generate JWT access token
 */
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "1d",
  });
};

/**
 * Verify JWT access token
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
