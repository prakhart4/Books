import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.SECRET!, (err, decoded) => {
    if (err || !decoded || typeof decoded === "string") {
      //   console.log(err);
      return res.status(403).json({ message: "Invalid token" });
    }

    req.body = { userId: decoded.userId };
    next();
  });
};
