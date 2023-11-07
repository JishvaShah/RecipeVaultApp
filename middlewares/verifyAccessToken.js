import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyAccessToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    // Token is valid, and decoded contains user information
    req.userId = decoded.id;
    next();
  });
};
